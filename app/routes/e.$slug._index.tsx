import { redirect, LoaderFunctionArgs } from "@remix-run/node";
import api from "~/clients/api";
import { ExtensionErrorBoundary } from "~/components/extension-error-boundary";

export async function loader({ params }: LoaderFunctionArgs) {
  const [publisherName, extensionName] = (params.slug ?? "").split(".");

  const searchQuery = {
    publisherName,
    extensionName,
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

  const theme = extension.themes[0];
  if (!theme) {
    throw new Response(null, { status: 404, statusText: "Theme not Found" });
  }

  return redirect(`/e/${publisherName}.${extensionName}/${theme.name}`);
}

export { ExtensionErrorBoundary as ErrorBoundary };
