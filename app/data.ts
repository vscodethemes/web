export const languages = [
  { value: "cpp", label: "C++" },
  { value: "css", label: "CSS" },
  { value: "go", label: "Go" },
  { value: "html", label: "HTML" },
  { value: "java", label: "Java" },
  { value: "js", label: "JavaScript" },
  { value: "php", label: "PHP" },
  { value: "py", label: "Python" },
  { value: "rb", label: "Ruby" },
  { value: "rs", label: "Rust" },
] as const;

export const languageValues = languages.map((l) => l.value);

export type Language = (typeof languages)[number]["value"];

export const sortBy = [
  { value: "relevance", label: "Relevance" },
  { value: "installs", label: "Installs" },
  { value: "trendingWeekly", label: "Trending" },
  { value: "updatedAt", label: "Recent" },
] as const;

export const sortByValues = sortBy.map((s) => s.value);

export type SortBy = (typeof sortBy)[number]["value"];
