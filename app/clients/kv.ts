export interface Extension {
  name: string;
  displayName: string;
  shortDescription: string | null;
  publisherName: string;
  publisherDisplayName: string;
  installs: number;
  trendingDaily: number;
  trendingWeekly: number;
  trendingMonthly: number;
  weightedRating: number;
  updatedAt: Date;
  createdAt: Date;
  publishedAt: Date;
  releasedAt: Date;
}

export interface Theme {
  displayName: string;
  activityBarBackground: string;
  activityBarBorder: string | null;
  activityBarForeground: string;
  editorBackground: string;
  editorForeground: string;
  editorGroupHeaderTabsBackground: string;
  editorGroupHeaderTabsBorder: string | null;
  statusBarBackground: string;
  statusBarForeground: string;
  statusBarBorder: string | null;
  tabActiveBackground: string;
  tabActiveBorder: string | null;
  tabActiveForeground: string;
  tabBorder: string;
  titleBarActiveBackground: string;
  titleBarActiveForeground: string;
  titleBarBorder: string | null;
}

export interface GetExtensionResult {
  extension: Extension;
  themes: Record<string, { theme: Theme }>;
}

export interface GetExtensionWithTokensResult {
  extension: Extension;
  themes: Record<string, { theme: Theme; tokens: any }>;
}

export class KVClient {
  constructor() {}

  async getExtensionWithTokens(
    extensionSlug: string,
    language: string,
  ): Promise<GetExtensionWithTokensResult | null> {
    const match: GetExtensionWithTokensResult | null = await VSCODETHEMES_EXTENSIONS.get(
      `${extensionSlug}/${language}`.toLowerCase(),
      { type: 'json' },
    );

    return match;
  }

  async getExtension(extensionSlug: string, language: string): Promise<GetExtensionResult | null> {
    const match: GetExtensionResult | null = await VSCODETHEMES_EXTENSIONS.get(
      `${extensionSlug}/${language}`.toLowerCase(),
      { type: 'json' },
    );

    if (match) {
      const themesWithoutTokens: Record<string, { theme: Theme }> = {};
      for (const [themeSlug, { theme }] of Object.entries(match.themes)) {
        themesWithoutTokens[themeSlug] = { theme };
      }

      return {
        ...match,
        themes: themesWithoutTokens,
      };
    }

    return match;
  }
}

export default new KVClient();
