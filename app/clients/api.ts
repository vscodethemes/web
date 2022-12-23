export interface SearchExtensionsOptions {
  text?: string;
  editorBackground?: string;
  activityBarBackground?: string;
  statusBarBackground?: string;
  tabActiveBackground?: string;
  titleBarActiveBackground?: string;
  maxColorDistance: number;
  sortBy: string;
  sortDirection: string;
  page: number;
  pageSize: number;
}

export interface SearchExtensionResult {
  name: string;
  publisherName: string;
  displayName: string;
  publisherDisplayName: string;
  themes: Array<{ slug: string; editorBackground: string }>;
}

export interface SearchExtensionResults {
  total: number;
  extensions: SearchExtensionResult[];
}

export interface User {
  id: string;
  accessToken: string;
  login: string;
  avatarUrl: string;
}

export class APIClient {
  constructor(private baseUrl: string, private apiKey: string) {}

  async searchExtensions(opts: SearchExtensionsOptions): Promise<SearchExtensionResults> {
    const url = new URL(`${this.baseUrl}/extensions/search`);
    url.searchParams.set('text', opts.text ?? '');
    url.searchParams.set('editorBackground', opts.editorBackground ?? '');
    url.searchParams.set('activityBarBackground', opts.activityBarBackground ?? '');
    url.searchParams.set('statusBarBackground', opts.statusBarBackground ?? '');
    url.searchParams.set('tabActiveBackground', opts.tabActiveBackground ?? '');
    url.searchParams.set('titleBarActiveBackground', opts.titleBarActiveBackground ?? '');
    url.searchParams.set('maxColorDistance', String(opts.maxColorDistance) ?? '');
    url.searchParams.set('sortBy', String(opts.sortBy) ?? '');
    url.searchParams.set('sortDirection', String(opts.sortDirection) ?? '');
    url.searchParams.set('page', String(opts.page) ?? '');
    url.searchParams.set('pageSize', String(opts.pageSize) ?? '');

    const response = await fetch(url.toString(), {
      headers: { 'X-API-Key': this.apiKey },
      cf: {
        // Cache search results for 4 hours.
        cacheTtl: 60 * 60 * 4,
        cacheEverything: true,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to search extensions: ${response.statusText}`);
    }

    return await response.json<SearchExtensionResults>();
  }

  async authorizeGithub(code: string): Promise<User> {
    const url = new URL(`${this.baseUrl}/auth/github`);
    url.searchParams.set('code', code);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'X-API-Key': this.apiKey },
    });

    if (!response.ok) {
      throw new Error(`Failed to authorize GitHub: ${response.statusText}`);
    }

    return await response.json<User>();
  }

  async isFavorite(user: User, extensionSlug: string, themeSlug: string) {
    const [publisherName, extensionName] = extensionSlug.split('.');

    const url = new URL(`${this.baseUrl}/users/${user.id}/favorites/exists`);
    url.searchParams.set('publisherName', publisherName);
    url.searchParams.set('extensionName', extensionName);
    url.searchParams.set('themeSlug', themeSlug);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        'X-API-Key': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to check if favorite exists: ${response.statusText}`);
    }

    const { exists } = await response.json<{ exists: boolean }>();
    return exists;
  }

  async addFavorite(user: User, extensionSlug: string, themeSlug: string) {
    const [publisherName, extensionName] = extensionSlug.split('.');

    const url = new URL(`${this.baseUrl}/users/${user.id}/favorites`);
    url.searchParams.set('publisherName', publisherName);
    url.searchParams.set('extensionName', extensionName);
    url.searchParams.set('themeSlug', themeSlug);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        'X-API-Key': this.apiKey,
      },
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to add favorite: ${response.statusText}`);
    }

    await response.json<void>();
  }

  async removeFavorite(user: User, extensionSlug: string, themeSlug: string) {
    const [publisherName, extensionName] = extensionSlug.split('.');

    const url = new URL(`${this.baseUrl}/users/${user.id}/favorites`);
    url.searchParams.set('publisherName', publisherName);
    url.searchParams.set('extensionName', extensionName);
    url.searchParams.set('themeSlug', themeSlug);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        'X-API-Key': this.apiKey,
      },
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(
        `Failed to remove favorite: ${response.statusText} ${await response.text()}}`,
      );
    }

    await response.json<void>();
  }
}

export default new APIClient(INTERNAL_API_URL, INTERNAL_API_KEY);
