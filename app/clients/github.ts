export type GithubTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
};

export type GithubUserResponse = {
  login: string;
  id: number;
  avatar_url: string;
};

export class GithubClient {
  constructor(private clientId: string) {}

  getAuthorizationUrl(scope: string): string {
    const s = encodeURIComponent(scope);
    return `https://github.com/login/oauth/authorize?client_id=${this.clientId}&scope=${s}`;
  }
}

export default new GithubClient(GITHUB_CLIENT_ID);
