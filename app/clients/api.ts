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
    | "trending_daily"
    | "trending_weekly"
    | "trending_monthly"
    | "rating"
    | "updated_at";
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

    // // We don't want to encode the URL, so we don't use the URLSearchParams.toString() method.
    // let query = `language=${input.language}`;
    // query += `&pageNumber=${input.pageNumber}`;
    // query += `&pageSize=${input.pageSize}`;
    // if (input.text) {
    //   query += `&text=${input.text}`;
    // }
    // if (input.editorBackground) {
    //   query += `&editorBackground=${input.editorBackground}`;
    // }
    // if (input.colorDistance) {
    //   query += `&colorDistance=${input.colorDistance}`;
    // }
    // if (input.sortBy) {
    //   query += `&sortBy=${input.sortBy}`;
    // }

    console.log(`${this.baseUrl}/extensions/search?${params}`);

    const response = await fetch(
      `${this.baseUrl}/extensions/search?${params}`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );

    // TODO: Handle errors.

    return await response.json();
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
