import { Extension } from "~/clients/api";
import { SearchResultsItem } from "~/components/search-results-item";

export interface SearchResultsProps {
  extensions: Extension[];
}

export function SearchResults({ extensions }: SearchResultsProps) {
  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 p-5 md:p-8">
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
