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
        <Button variant="ghost" className="pr-3">
          <span className="text-gray-400 font-light">Sort By:</span>
          &nbsp;{selected.label}
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

              submit(
                {
                  q: searchParams.get("q"),
                  sort: option.value,
                },
                {
                  method: "GET",
                  action: location.pathname + "?" + searchParams.toString(),
                }
              );
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
