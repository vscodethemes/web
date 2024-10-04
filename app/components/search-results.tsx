import { Extension } from "~/clients/api";

export interface SearchResultsProps {
  extensions: Extension[];
}

export function SearchResults({ extensions }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {extensions.map((extension) => (
        <img
          key={`${extension.publisherName}/${extension.name}`}
          src={extension.themes[0].url}
          alt={`${extension.publisherName}/${extension.name}`}
          className="shadow-lg rounded-lg"
        />
      ))}
    </div>
  );
}
