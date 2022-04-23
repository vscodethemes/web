import { Link, useSearchParams } from '@remix-run/react';
import { resetColorQuery, hasColorQuery } from '~/utilities/colorQuery';

export default function TypeTabs() {
  const [searchParams] = useSearchParams();

  const allThemesTo = new URLSearchParams(searchParams);
  allThemesTo.delete('type');
  allThemesTo.delete('page');
  resetColorQuery(allThemesTo);

  const darkTo = new URLSearchParams(searchParams);
  darkTo.set('type', 'dark');
  darkTo.delete('page');
  resetColorQuery(darkTo);

  const lightTo = new URLSearchParams(searchParams);
  lightTo.set('type', 'light');
  lightTo.delete('page');
  resetColorQuery(lightTo);

  let activeTab = '';
  if (searchParams.get('type') === 'dark') {
    activeTab = 'dark';
  } else if (searchParams.get('type') === 'light') {
    activeTab = 'light';
  } else if (!hasColorQuery(searchParams)) {
    activeTab = 'all';
  }

  return (
    <nav className="type-tabs tabs">
      <Link to={`/?${allThemesTo.toString()}`} data-active={activeTab === 'all'}>
        All<span>&nbsp;Themes</span>
      </Link>
      <Link to={`/?${darkTo.toString()}`} data-active={activeTab === 'dark'}>
        Dark
      </Link>
      <Link to={`/?${lightTo.toString()}`} data-active={activeTab === 'light'}>
        Light
      </Link>
    </nav>
  );
}
