export type PartialExtension = {
  name: string;
  publisherName: string;
  displayName: string;
  publisherDisplayName: string;
  themes: Array<{ slug: string; editorBackground: string }>;
};

export type User = {
  id: string;
  login: string;
  avatarUrl: string;
  accessToken: string;
};
