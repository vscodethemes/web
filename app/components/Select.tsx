import * as React from 'react';
import { Link, useSearchParams } from '@remix-run/react';
import Popover, { PopoverProps } from './Popover';

type SelectProps<Value, Option> = {
  name: string;
  value: Value;
  options: Option[];
  optionComponent?: React.FC<Option>;
  selectedComponent?: React.FC<Option>;
  anchorAlignment?: PopoverProps['anchorAlignment'];
  className?: string;
  label?: string;
  modifySearchParams?: (searchParams: URLSearchParams) => void;
};

const icon = (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.16667 0.641741C9.01053 0.486532 8.79932 0.399414 8.57917 0.399414C8.35901 0.399414 8.1478 0.486532 7.99167 0.641741L5 3.59174L2.05 0.641741C1.89386 0.486532 1.68266 0.399414 1.4625 0.399414C1.24235 0.399414 1.03114 0.486532 0.875 0.641741C0.796893 0.71921 0.734898 0.811378 0.692591 0.912927C0.650284 1.01448 0.628502 1.1234 0.628502 1.23341C0.628502 1.34342 0.650284 1.45234 0.692591 1.55389C0.734898 1.65544 0.796893 1.74761 0.875 1.82507L4.40833 5.35841C4.4858 5.43652 4.57797 5.49851 4.67952 5.54082C4.78107 5.58312 4.88999 5.60491 5 5.60491C5.11001 5.60491 5.21893 5.58312 5.32048 5.54082C5.42203 5.49851 5.5142 5.43652 5.59167 5.35841L9.16667 1.82507C9.24477 1.74761 9.30677 1.65544 9.34908 1.55389C9.39138 1.45234 9.41317 1.34342 9.41317 1.23341C9.41317 1.1234 9.39138 1.01448 9.34908 0.912927C9.30677 0.811378 9.24477 0.71921 9.16667 0.641741Z"
      fill="currentColor"
    />
  </svg>
);

export default function Select<
  Value extends string,
  Option extends { value: Value; label: string },
>({
  name,
  value,
  options,
  optionComponent: OptionComponent = (option: Option) => <>{option.label}</>,
  selectedComponent: SelectedComponent = (option: Option) => <>{option.label}</>,
  anchorAlignment,
  className,
  label,
  modifySearchParams,
}: SelectProps<Value, Option>) {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = React.useState(false);
  const anchor = React.useRef<HTMLButtonElement | null>(null);

  // const handle

  const selectedOption = options.find((o) => o.value === value);

  return (
    <>
      <button
        className={`select${className ? ` ${className}` : ''}`}
        type="button"
        ref={anchor}
        data-open={isOpen}
        onClick={() => setIsOpen(true)}
        aria-label={label}
      >
        {selectedOption && <SelectedComponent {...selectedOption} />}
        {icon}
      </button>
      {anchor.current && (
        <Popover
          open={isOpen}
          anchor={anchor.current}
          anchorAlignment={anchorAlignment}
          onClose={() => setIsOpen(false)}
        >
          <div className="select-options">
            {options.map((option) => {
              const to = new URLSearchParams(searchParams);
              to.set(name, option.value);

              if (modifySearchParams) {
                modifySearchParams(to);
              }

              return (
                <Link
                  key={option.value}
                  className="select-option"
                  to={`?${to.toString()}`}
                  onClick={() => setIsOpen(false)}
                  data-selected={selectedOption === option}
                >
                  <OptionComponent {...option} />
                </Link>
              );
            })}
          </div>
        </Popover>
      )}
    </>
  );
}
