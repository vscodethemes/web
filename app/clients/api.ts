export interface SearchResults {
  total: number;
  extensions: Extension[];
}

export interface Extension {
  name: string;
  displayName: string;
  publisherName: string;
  publisherDisplayName: string;
  shortDescription: string;
  totalThemes: number;
  themes: ThemePartial[];
  theme?: Theme;
}

export interface Theme {
  url: string;
  name: string;
  displayName: string;
  editorBackground: string;
  editorForeground: string;
  activityBarBackground: string;
  activityBarForeground: string;
  activityBarInActiveForeground: string;
  activityBarBorder: string | null;
  activityBarActiveBorder: string;
  activityBarActiveBackground: string | null;
  activityBarBadgeBackground: string;
  activityBarBadgeForeground: string;
  tabsContainerBackground: string | null;
  tabsContainerBorder: string | null;
  statusBarBackground: string | null;
  statusBarForeground: string;
  statusBarBorder: string | null;
  tabActiveBackground: string | null;
  tabInactiveBackground: string | null;
  tabActiveForeground: string;
  tabBorder: string;
  tabActiveBorder: string | null;
  tabActiveBorderTop: string | null;
  titleBarActiveBackground: string;
  titleBarActiveForeground: string;
  titleBarBorder: string | null;
}

export interface ThemePartial {
  url: string;
  name: string;
  displayName: string;
  editorBackground: string;
  activityBarBadgeBackground: string;
}

export interface SearchExtensionsInput {
  text?: string;
  editorBackground?: string;
  language?: string;
  sortBy?:
    | "relevance"
    | "installs"
    | "trendingDaily"
    | "trendingWeekly"
    | "trendingMonthly"
    | "rating"
    | "updatedAt";
  colorDistance?: number;
  publisherName?: string;
  extensionName?: string;
  themeName?: string;
  extensionsPageNumber?: number;
  extensionsPageSize?: number;
  themesPageNumber?: number;
  themesPageSize?: number;
}

export class ApiClient {
  constructor(private baseUrl: string, private apiKey: string) {}

  async searchExtensions(input: SearchExtensionsInput): Promise<SearchResults> {
    const params = new URLSearchParams();

    if (input.text) {
      params.set("text", input.text);
    }
    if (input.editorBackground) {
      params.set("editorBackground", input.editorBackground);
    }
    if (input.language) {
      params.set("language", input.language);
    }
    if (input.sortBy) {
      params.set("sortBy", input.sortBy);
    }
    if (input.colorDistance) {
      params.set("colorDistance", input.colorDistance.toString());
    }
    if (input.publisherName) {
      params.set("publisherName", input.publisherName);
    }
    if (input.extensionName) {
      params.set("extensionName", input.extensionName);
    }
    if (input.themeName) {
      params.set("themeName", input.themeName);
    }
    if (input.extensionsPageNumber) {
      params.set("extensionsPageNumber", input.extensionsPageNumber.toString());
    }
    if (input.extensionsPageSize) {
      params.set("extensionsPageSize", input.extensionsPageSize.toString());
    }
    if (input.themesPageNumber) {
      params.set("themesPageNumber", input.themesPageNumber.toString());
    }
    if (input.themesPageSize) {
      params.set("themesPageSize", input.themesPageSize.toString());
    }

    const response = await fetch(
      `${this.baseUrl}/extensions/search?${params}`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch extensions: ${response.statusText}`);
    }

    return await response.json();
  }

  async makeRequest(request: Request): Promise<Response> {
    const response = await fetch(request, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch make request to ${request.url}: ${response.statusText}`
      );
    }

    return response;
  }
}

const apiUrl = process.env.API_URL;
if (!apiUrl) {
  throw new Error("Missing API_URL environment variable");
}

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("Missing API_KEY environment variable");
}

export default new ApiClient(apiUrl, apiKey);
