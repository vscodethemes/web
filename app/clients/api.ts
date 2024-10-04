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
  themes: Theme[];
}

export interface Theme {
  name: string;
  displayName: string;
  editorBackground: string;
  url: string;
}

export interface SearchExtensionsInput {
  language: string;
  pageNumber: number;
  pageSize: number;
  text?: string;
  editorBackground?: string;
  colorDistance?: number;
  sortBy?:
    | "relevance"
    | "installs"
    | "trendingDaily"
    | "trendingWeekly"
    | "trendingMonthly"
    | "rating"
    | "updatedAt";
}

export class ApiClient {
  constructor(private baseUrl: string, private apiKey: string) {}

  async searchExtensions(input: SearchExtensionsInput): Promise<SearchResults> {
    const params = new URLSearchParams();
    params.set("language", input.language);
    params.set("pageNumber", input.pageNumber.toString());
    params.set("pageSize", input.pageSize.toString());
    if (input.text) {
      params.set("text", input.text);
    }
    if (input.editorBackground) {
      params.set("editorBackground", input.editorBackground);
    }
    if (input.colorDistance) {
      params.set("colorDistance", input.colorDistance.toString());
    }
    if (input.sortBy) {
      params.set("sortBy", input.sortBy);
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
