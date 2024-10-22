import { Link } from "@remix-run/react";
import { GlobalLoading } from "~/components/global-loading";
import { VSCodeThemesIcon } from "~/components/vsct-icon";

export interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 px-5 md:px-8 w-full h-[60px] backdrop-blur bg-background/90 bg-opacity-90 border-b flex items-center gap-4">
      <GlobalLoading />
      <Link className="flex gap-2 items-center" title="VS Code Themes" to="/">
        <VSCodeThemesIcon />
        <div className="hidden sm:flex">
          <span className="text-vsct-primary">VS Code</span>&nbsp;
          <span className="text-vsct-foreground"> Themes</span>
        </div>
      </Link>
      <div className="flex-1 flex items-center justify-end">
        <div className="flex items-center gap-3 -mr-2">{children}</div>
      </div>
    </header>
  );
}
