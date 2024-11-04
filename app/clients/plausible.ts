export type PlausibleProps = Record<
  string,
  null | undefined | boolean | number | string
>;

export class PlausibleClient {
  constructor(private baseUrl: string, private domain: string) {}

  async event(
    request: Request,
    event: string,
    props?: PlausibleProps
  ): Promise<void> {
    if (request.url.includes("localhost")) {
      console.warn("Skipping plausible event in development");
      return;
    }

    const userAgent = request.headers.get("User-Agent") ?? "";
    let ipAddress =
      request.headers.get("CF-Connecting-IP") ??
      request.headers.get("X-Forwarded-For") ??
      request.headers.get("X-Real-IP") ??
      "";

    ipAddress = ipAddress.split(",")[0].trim();

    const referrer = request.headers.get("Referer") ?? undefined;

    console.info("Sending event to plausible", {
      event,
      props,
      userAgent,
      ipAddress,
      referrer,
    });

    const response = await fetch(`${this.baseUrl}/api/event`, {
      headers: {
        "User-Agent": userAgent,
        "X-Forwarded-For": ipAddress,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        domain: this.domain,
        url: request.url,
        name: event,
        referrer,
        props,
      }),
    });

    if (!response.ok) {
      console.error(
        `Failed to post event to plausible: ${response.statusText}`
      );
      console.error(await response.text());
    }

    return;
  }
}

const plausibleUrl = process.env.PLAUSIBLE_URL;
if (!plausibleUrl) {
  throw new Error("Missing PLAUSIBLE_URL environment variable");
}

const plausibleDomain = process.env.PLAUSIBLE_DOMAIN;
if (!plausibleDomain) {
  throw new Error("Missing PLAUSIBLE_DOMAIN environment variable");
}

export default new PlausibleClient(plausibleUrl, plausibleDomain);
