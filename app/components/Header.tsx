import * as React from 'react';
import { Link, useSearchParams } from '@remix-run/react';
import Logo from './Logo';

type HeaderProps = {
  logoColor?: string;
};

export default function Header({ logoColor, children }: React.PropsWithChildren<HeaderProps>) {
  const [searchParams] = useSearchParams();
  const [isStuck, setIsStuck] = React.useState(false);

  const languageQs = searchParams.get('language');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(entry.intersectionRatio < 1),
      { threshold: [1] },
    );

    const mainEl = document.getElementsByTagName('header')[0];
    observer.observe(mainEl);

    return () => {
      observer.unobserve(mainEl);
    };
  });

  return (
    <>
      <header data-stuck={isStuck}>
        <div className="header-shadow" />
        <div className="header-inner">
          <Link
            className="logo"
            to={`/${languageQs ? `?language=${languageQs}` : ''}`}
            title="VS Code Themes"
          >
            <Logo color={logoColor} />
          </Link>
          {children}
        </div>
      </header>
    </>
  );
}
