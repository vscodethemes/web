import { useState } from "react";
import { Link } from "@remix-run/react";
import { Extension, ThemePartial } from "~/clients/api";
import * as t from "~/lib/theme-variables";

export interface SearchResultsItemProps {
  extension: Extension;
  loadingStrategy: "lazy" | "eager";
}

export function SearchResultsItem({
  extension,
  loadingStrategy,
}: SearchResultsItemProps) {
  const [hoveredTheme, setHoveredTheme] = useState<ThemePartial | null>(null);

  const previewTheme = hoveredTheme || extension.themes[0];
  const previewSlug = `${extension.publisherName}.${extension.name}/${previewTheme.name}`;

  const otherThemes = extension.themes.slice(1);

  return (
    <div className="flex flex-col gap-2">
      <Link
        to={`/e/${previewSlug}`}
        className="flex aspect-theme rounded-lg shadow-lg border border-accent hover:outline outline-offset-2 outline-2 outline-ring "
        style={{
          backgroundColor: previewTheme.editorBackground,
          "--ring": t.ring(previewTheme.activityBarBadgeBackground),
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

        {otherThemes.length > 0 && (
          <div className="flex justify-end content-start flex-wrap mt-1">
            {otherThemes.map((theme) => {
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
                      "--ring": t.ring(previewTheme.activityBarBadgeBackground),
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
