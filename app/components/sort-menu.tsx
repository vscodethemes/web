import { useSubmit, useLocation } from "@remix-run/react";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { sortBy, SortBy } from "~/data";

export interface SortByMenuProps {
  value: SortBy;
}

export function SortByMenu({ value }: SortByMenuProps) {
  const location = useLocation();
  const submit = useSubmit();
  const selected = sortBy.find((s) => s.value === value) || sortBy[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hidden md:flex p-0 md:pl-3 md:pr-3">
          <span className="text-gray-400 font-light mr-2">Sort By:</span>
          {selected.label}
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        {sortBy.map((option) => (
          <DropdownMenuItem
            key={option.value}
            disabled={selected.value === option.value}
            onClick={() => {
              const searchParams = new URLSearchParams(location.search);
              const query: Record<string, string> = {};
              if (searchParams.has("q")) {
                query.q = searchParams.get("q")!;
              }
              query.sort = option.value;

              submit(query, {
                method: "GET",
                action: `${location.pathname}?${searchParams}`,
                // action: location.pathname + "?" + searchParams.toString(),
              });
            }}
          >
            <div className="flex-1">{option.label}</div>
            {selected.value === option.value && (
              <CheckIcon className="w-4 h-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
