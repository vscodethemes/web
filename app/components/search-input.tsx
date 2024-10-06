import { Form, useLocation } from "@remix-run/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "~/components/ui/input";

export interface SearchInputProps {
  value: string;
}

export function SearchInput({ value }: SearchInputProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sort = searchParams.get("sort");

  return (
    <Form className="w-full max-w-80 relative">
      <Input
        className="peer bg-muted pl-8"
        placeholder="Search..."
        name="q"
        defaultValue={value}
      />
      {sort && <input type="hidden" name="sort" value={sort} />}
      <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
    </Form>
  );
}