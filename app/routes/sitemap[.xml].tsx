import api from "~/clients/api";

export async function loader() {
  const results = await api.searchExtensions({ extensionsPageSize: 10000 });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${results.extensions
          .map((extension) => {
            const theme = extension.themes[0];
            const page = `${process.env.WEB_URL}/e/${extension.publisherName}.${extension.name}/${theme.name}`;
            return `<url><loc>${page}</loc></url>`;
          })
          .join("")}
      </urlset>`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}
