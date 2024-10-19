import { redirect, LoaderFunctionArgs } from "@remix-run/node";
import api from "~/clients/api";
import plausible from "~/clients/plausible";
import * as s from "~/lib/search-params";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const [publisherName, extensionName] = (params.slug ?? "").split(".");
  const themeName = params.theme;

  const searchQuery = {
    publisherName,
    extensionName,
    themeName,
    extensionsPageNumber: 1,
    extensionsPageSize: 1,
    themesPageNumber: 1,
    themesPageSize: 1,
  };

  const results = await api.searchExtensions(searchQuery);

  const extension = results.extensions[0];
  if (!extension) {
    throw new Response(null, {
      status: 404,
      statusText: "Extension not Found",
    });
  }

  const theme = extension.theme;
  if (!theme) {
    throw new Response(null, { status: 404, statusText: "Theme not Found" });
  }

  const url = new URL(request.url);
  const openWithParam = s.literal(url.searchParams, "with", "vscode", [
    "vscode",
    "vscodeweb",
  ]);

  const openWithOptions = {
    vscode: {
      url: `vscode:extension/${publisherName}.${extensionName}`,
      event: "Open with VS Code",
    },
    vscodeweb: {
      url: `https://vscode.dev/theme/${publisherName}.${extensionName}/${theme.displayName}`,
      event: "Open with VS Code Web",
    },
  };

  const openWith = openWithOptions[openWithParam];

  // Send event to analytics.
  plausible.event(request, openWith.event, {
    extension: `${publisherName}.${extensionName}`,
    theme: `${publisherName}.${extensionName}/${themeName}`,
  });

  // Redirect to the VS Code URL.
  return redirect(openWith.url);
}
