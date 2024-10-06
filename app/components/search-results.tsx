import { Link } from "@remix-run/react";
import { Extension } from "~/clients/api";

export interface SearchResultsProps {
  extensions: Extension[];
}

export function SearchResults({ extensions }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {extensions.map((extension, index) => {
        const theme = extension.themes[0];
        const slug = `${extension.publisherName}.${extension.name}/${theme.name}`;
        return (
          <div key={slug} className="flex flex-col gap-2">
            <Link
              to={`/e/${slug}`}
              className="flex aspect-theme rounded-lg shadow-lg"
              style={{ backgroundColor: theme.editorBackground }}
            >
              <img
                className="rounded-lg"
                loading={index >= 6 ? "lazy" : "eager"}
                src={theme.url}
                alt=""
              />
            </Link>

            <div className="flex gap-2 h-16">
              <div className="flex-1 flex flex-col">
                <h2 className="text-md">{extension.displayName}</h2>
                <h3 className="text-xs">by {extension.publisherDisplayName}</h3>
              </div>

              {extension.themes.length > 1 && (
                <div className="flex justify-end content-start flex-wrap gap-1">
                  {extension.themes.map((theme) => {
                    const slug = `${extension.publisherName}.${extension.name}/${theme.name}`;
                    return (
                      <div
                        key={slug}
                        className="w-5 h-2 rounded-sm border"
                        style={{
                          backgroundColor: theme.editorBackground,
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
