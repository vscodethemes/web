import type { LoaderFunctionArgs } from "@remix-run/node";
import { renderAsync } from "@resvg/resvg-js";
import { colord } from "colord";
import path from "path";
import api from "~/clients/api";
import { languageValues } from "~/data";
import * as s from "~/lib/search-params";
import * as t from "~/lib/theme-variables";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const [publisherName, extensionName] = (params.slug ?? "").split(".");
  const themeName = params.theme;

  const url = new URL(request.url);
  const language = s.literal(
    url.searchParams,
    "language",
    "js",
    languageValues
  );

  const searchQuery = {
    publisherName,
    extensionName,
    themeName,
    language,
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

  const themeSvgRes = await fetch(theme.url);
  const themeSvg = await themeSvgRes.text();

  const width = 1200;
  const height = 630;
  const themePadding = 42;
  const themeWidth = 460;
  const themeHeight = 331;
  const themeAspectRatio = themeWidth / themeHeight;
  const themeScaleX = 1 - themePadding / themeWidth;
  const themeScaleY = 1 - themePadding / themeHeight;
  const themeEditorBackground = colord(theme.editorBackground);
  const themeBorderHeight = height;
  const themeBorderWidth = themeBorderHeight * themeAspectRatio;
  const themeBorderTranslateX = -themeBorderWidth / 2;

  const backgroundColor = themeEditorBackground.isDark()
    ? t.background(theme.editorBackground, true)
    : t.background(theme.editorBackground, false);

  const borderColor = themeEditorBackground.isDark()
    ? t.border(theme.editorBackground, true)
    : t.border(theme.editorBackground, false);

  const svg = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${width}"
    height="${height}"
    viewBox="0 0 ${width} ${height}"
  >
    <rect
      width="${width}"
      height="${height}"
      fill="hsl(${backgroundColor})"
    />
    <g transform="translate(${themePadding}, ${themePadding}) scale(${themeScaleX} ${themeScaleY})">
      ${themeSvg}
      <rect 
        width="${themeBorderWidth}" 
        height="${themeBorderHeight}" 
        transform="translate(${themeBorderTranslateX}, 0)" 
        stroke="hsl(${borderColor})"
        x="50%" 
        rx="16" 
        fill="none"
      />
      </g>
  </svg>`;

  // To render as PNG we need to provide the font files. Replace the SVG's default font with our
  // known custom font files.
  const svgWithFont = svg
    .replace(
      `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`,
      "Inter"
    )
    .replace(
      `'SFMono-Regular',Consolas,'Liberation Mono',Menlo,Courier,monospace`,
      "Fira Code"
    );

  const image = await renderAsync(svgWithFont, {
    font: {
      loadSystemFonts: false,
      fontFiles: [
        path.resolve("./fonts/Inter/static/Inter_18pt-Regular.ttf"),
        path.resolve("./fonts/Fira_Code/static/FiraCode-Regular.ttf"),
      ],
      sansSerifFamily: "Inter",
      monospaceFamily: "Fira Code",
    },
  });

  return new Response(image.asPng(), {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
