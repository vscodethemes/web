export interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 px-8 h-[60px] bg-background/95 bg-opacity-95 border-b flex items-center gap-4">
      <a className="flex gap-2 items-center" title="VS Code Themes" href="/">
        <svg
          className="h-5 text-muted-foreground/75"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="3.89189"
            height="1.94595"
            rx="0.972973"
            className="fill-vsct-2"
          ></rect>
          <rect
            x="6.08105"
            width="11.9189"
            height="1.94595"
            rx="0.972973"
            fill="currentColor"
          ></rect>
          <rect
            x="1.70276"
            y="3.64868"
            width="8.02703"
            height="1.94595"
            rx="0.972973"
            fill="currentColor"
          ></rect>
          <rect
            x="11.9189"
            y="3.64868"
            width="6.08108"
            height="1.94595"
            rx="0.972973"
            className="fill-vsct-3"
          ></rect>
          <rect
            x="3.89185"
            y="7.78369"
            width="3.64865"
            height="1.94595"
            rx="0.972973"
            className="fill-vsct-4"
          ></rect>
          <rect
            x="9.97296"
            y="7.78369"
            width="8.02703"
            height="1.94595"
            rx="0.972973"
            fill="currentColor"
          ></rect>
          <rect
            x="1.94592"
            y="11.9189"
            width="10.2162"
            height="1.94595"
            rx="0.972973"
            fill="currentColor"
          ></rect>
          <rect
            x="14.1081"
            y="11.9189"
            width="3.89189"
            height="1.94595"
            rx="0.972973"
            className="fill-vsct-5"
          ></rect>
          <rect
            x="11.9189"
            y="16.054"
            width="6.08108"
            height="1.94595"
            rx="0.972973"
            fill="currentColor"
          ></rect>
          <rect
            y="16.054"
            width="10.2162"
            height="1.94595"
            rx="0.972973"
            className="fill-vsct-1"
          ></rect>
        </svg>
        <div className="flex">
          <span className="text-vsct-1">VS Code</span>
          &nbsp;Themes
        </div>
      </a>
      <div className="flex-1 flex items-center justify-end gap-3">
        {children}
      </div>
    </header>
  );
}
