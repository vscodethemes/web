import * as React from 'react';

export type PopoverProps = {
  open?: boolean;
  anchor: Element;
  anchorAlignment?: { horizontal: 'left' | 'right' };
  borderColor?: string;
  onClose: () => void;
};

export default function Popover({
  open,
  anchor,
  anchorAlignment = { horizontal: 'left' },
  borderColor,
  onClose,
  children,
}: React.PropsWithChildren<PopoverProps>) {
  const popover = React.useRef<HTMLDivElement | null>(null);

  // Set popover position.
  React.useLayoutEffect(() => {
    if (anchor && open && popover.current) {
      const anchorRect = anchor.getBoundingClientRect();
      const popoverRect = popover.current.getBoundingClientRect();

      let top = 'auto';
      let left = 'auto';
      let bottom = 'auto';
      let right = 'auto';
      if (anchorAlignment.horizontal === 'left') {
        top = `calc(${anchorRect.y + anchorRect.height}px + 0.5rem)`;
        left = `${Math.min(anchorRect.x, window.innerWidth - popoverRect.width)}px`;
      } else {
        top = `calc(${anchorRect.y + anchorRect.height}px + 0.5rem)`;
        right = `${window.innerWidth - anchorRect.x - anchorRect.width}px`;
      }

      popover.current.style.setProperty('--popover-top', top);
      popover.current.style.setProperty('--popover-left', left);
      popover.current.style.setProperty('--popover-bottom', bottom);
      popover.current.style.setProperty('--popover-right', right);
      popover.current.style.setProperty('--popover-width', `${anchorRect.width}px`);
    }
  });

  // Close on click outside.
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!popover.current || !event.target || popover.current.contains(event.target as Node)) {
        return;
      }
      onClose();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  });

  return (
    <div
      className="popover"
      ref={popover}
      data-open={open}
      style={{ '--popover-border-color': borderColor }}
    >
      {children}
    </div>
  );
}
