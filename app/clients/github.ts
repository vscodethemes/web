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
  constructor(private clientId: string, private clientSecret: string) {}

  getAuthorizationUrl(scope: string): string {
    const s = encodeURIComponent(scope);
    return `https://github.com/login/oauth/authorize?client_id=${this.clientId}&scope=${s}`;
  }

  async getAccessToken(code: string) {
    const response = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${code}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      },
    );

    // TODO: Validate response data.
    return await response.json<GithubTokenResponse>();
  }

  async getUser(accessToken: string) {
    const userResponse = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'VSCodeThemes',
      },
    });

    // TODO: Validate response data.
    return await userResponse.json<GithubUserResponse>();
  }
}

export default new GithubClient(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
