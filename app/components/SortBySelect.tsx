import Select from './Select';

const sortByOption = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Installs', value: 'installs' },
  { label: 'Trending', value: 'trendingMonthly' },
  { label: 'Recent', value: 'updatedAt' },
];

type SoryBySelectProps = {
  value: string;
};

export default function SoryBySelect({ value }: SoryBySelectProps) {
  return (
    <Select
      className="sortby"
      name="sortBy"
      label="Sort By"
      value={value}
      options={sortByOption}
      selectedComponent={SortBySelected}
      anchorAlignment={{ horizontal: 'right' }}
      modifySearchParams={(searchParams) => {
        searchParams.delete('page');
      }}
    />
  );
}

type SortBySelectedProps = {
  label: string;
};

function SortBySelected({ label }: SortBySelectedProps) {
  return (
    <div className="sortby-selected">
      <span>Sort By: </span>
      {label}
    </div>
  );
}
