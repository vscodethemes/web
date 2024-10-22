import { colord } from "colord";
import { useState, useEffect } from "react";
import { Form, useLocation, Link } from "@remix-run/react";
import { MagnifyingGlassIcon, CheckIcon } from "@radix-ui/react-icons";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

export interface SearchInputProps {
  value: string;
}

const topColors = {
  light: [
    "#ffffff",
    "#eeeeee",
    "#d5d6db",
    "#fffcf0",
    "#ede8e1",
    "#f8eac1",
    "#ebeef5",
    "#ebf8ff",
    "#d3f3fc",
    "#ddf0de",
    "#f4f6ff",
    "#e5ddff",
    "#fff0ec",
    "#f3e7e2",
  ],
  dark: [
    "#000000",
    "#1f2020",
    "#272c33",
    "#3f3f3f",
    "#373e4d",
    "#2d2b54",
    "#504a68",
    "#000040",
    "#091e40",
    "#02223c",
    "#2b3e50",
    "#380000",
    "#493936",
    "#373f27",
  ],
} as const;

export function SearchInput({ value }: SearchInputProps) {
  const location = useLocation();
  const [search, setSearch] = useState(value);
  const [openColorSelector, setOpenColorSelector] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const sort = searchParams.get("sort");

  const searchColor = colord(search);

  // Update the search input when the value changes.
  useEffect(() => {
    setSearch(value);
  }, [value]);

  const renderColor = (color: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("q", color);

    const isActive =
      searchColor.isValid() && colord(color).isEqual(searchColor);

    return (
      <Link
        key={color}
        to={`/?${searchParams.toString()}`}
        className="p-[3px]"
        onClick={() => setOpenColorSelector(false)}
      >
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full border hover:border-muted-foreground",
            isActive && "border-muted-foreground"
          )}
          title={color}
          style={{ backgroundColor: color }}
        >
          {isActive && <CheckIcon className="w-4 h-4 text-foreground/75" />}
        </div>
      </Link>
    );
  };

  return (
    <Form className="sm:w-[230px] relative">
      <Popover open={openColorSelector}>
        <PopoverAnchor asChild>
          <div>
            <Input
              className="peer bg-muted pl-8"
              placeholder="Search..."
              name="q"
              value={search}
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setOpenColorSelector(true)}
              onBlur={() => setOpenColorSelector(false)}
            />
            {searchColor.isValid() ? (
              <div
                className={cn(
                  "absolute left-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center w-[18px] h-[18px] rounded-full border border-muted-foreground/50"
                )}
                title={search}
                style={{ backgroundColor: search }}
              />
            ) : (
              <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            )}
            {sort && <input type="hidden" name="sort" value={sort} />}
          </div>
        </PopoverAnchor>

        <PopoverContent
          className="w-[230px] backdrop-blur bg-background/90 bg-opacity-90 p-2"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="grid gap-4">
            <div className="space-y-2">
              <h5 className="text-xs text-muted-foreground">Popular Colors</h5>
              <div className="flex flex-wrap dark:hidden">
                {topColors.light.map(renderColor)}
              </div>
              <div className="flex-wrap hidden dark:flex">
                {topColors.dark.map(renderColor)}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Form>
  );
}
