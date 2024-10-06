import { useState } from "react";
import { Link } from "@remix-run/react";
import { Extension, Theme } from "~/clients/api";
import { toHsl } from "~/lib/utils";

export interface SearchResultsItemProps {
  extension: Extension;
  loadingStrategy: "lazy" | "eager";
}

export function SearchResultsItem({
  extension,
  loadingStrategy,
}: SearchResultsItemProps) {
  const [hoveredTheme, setHoveredTheme] = useState<Theme | null>(null);

  const previewTheme = hoveredTheme || extension.themes[0];
  const previewSlug = `${extension.publisherName}.${extension.name}/${previewTheme.name}`;

  return (
    <div className="flex flex-col gap-2">
      <Link
        to={`/e/${previewSlug}`}
        className="flex aspect-theme rounded-lg shadow-lg hover:outline outline-offset-2 outline-2 outline-ring"
        style={{
          backgroundColor: previewTheme.editorBackground,
          "--ring": toHsl(previewTheme.activityBarBadgeBackground),
        }}
      >
        <img
          className="rounded-lg"
          loading={loadingStrategy}
          src={previewTheme.url}
          alt=""
        />
      </Link>

      <div className="flex gap-2 h-16">
        <div className="flex-1 flex flex-col">
          <h2 className="text-md">{extension.displayName}</h2>
          <h3 className="text-xs">by {extension.publisherDisplayName}</h3>
        </div>

        {extension.themes.length > 1 && (
          <div className="flex justify-end content-start flex-wrap mt-1">
            {extension.themes.map((theme) => {
              const slug = `${extension.publisherName}.${extension.name}/${theme.name}`;
              return (
                <Link
                  key={slug}
                  to={`/e/${slug}`}
                  className="p-[2px]"
                  onMouseEnter={() => setHoveredTheme(theme)}
                  onMouseLeave={() => setHoveredTheme(null)}
                >
                  <div
                    className="w-4 h-4 rounded-full border hover:border-ring"
                    title={theme.displayName}
                    style={{
                      backgroundColor: theme.editorBackground,
                      "--ring": toHsl(previewTheme.activityBarBadgeBackground),
                    }}
                  ></div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
