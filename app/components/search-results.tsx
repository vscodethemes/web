import { Extension } from "~/clients/api";
import { SearchResultsItem } from "~/components/search-results-item";

export interface SearchResultsProps {
  extensions: Extension[];
}

export function SearchResults({ extensions }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {extensions.map((extension, index) => {
        const slug = `${extension.publisherName}.${extension.name}`;
        return (
          <SearchResultsItem
            key={slug}
            extension={extension}
            loadingStrategy={index >= 6 ? "lazy" : "eager"}
          />
        );
      })}
    </div>
  );
}
