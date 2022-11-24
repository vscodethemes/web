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
      headers: {
        'X-API-Key': this.apiKey,
      },
      cf: {
        // Cache search results for 4 hours.
        cacheTtl: 60 * 60 * 4,
        cacheEverything: true,
      },
    });

    const result = await response.json<SearchExtensionResults>();
    return result;
  }
}

export default new APIClient(INTERNAL_API_URL, INTERNAL_API_KEY);
