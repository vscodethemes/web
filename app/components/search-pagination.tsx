import { useRef } from "react";
import { useSearchParams } from "@remix-run/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { CornerDownLeft } from "lucide-react";

export interface SearchPaginationProps {
  total: number;
  pageNumber: number;
  pageSize: number;
}

const maxVisiblePages = 7;

export function SearchPagination({
  total,
  pageNumber,
  pageSize,
}: SearchPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const totalPages = Math.ceil(total / pageSize);
  const startPage = Math.max(pageNumber - Math.floor(maxVisiblePages / 2), 1);

  const pages: number[] = [];
  for (let i = startPage; i < startPage + maxVisiblePages; i++) {
    if (i > totalPages) break;
    pages.push(i);
  }

  if (totalPages <= 1) {
    return null;
  }

  const doJump = () => {
    const value = inputRef.current?.value || "";
    const targetPage = Math.min(
      Math.max(parseInt(value, 10) || 1, 1),
      totalPages
    );
    const next = new URLSearchParams(searchParams);
    next.set("page", String(targetPage));
    setSearchParams(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    doJump();
  };

  const prevTo = new URLSearchParams(searchParams);
  prevTo.set("page", String(Math.max(pageNumber - 1, 1)));

  const nextTo = new URLSearchParams(searchParams);
  nextTo.set("page", String(Math.min(pageNumber + 1, totalPages)));

  return (
    <Pagination className="py-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={`?${prevTo.toString()}`} />
        </PaginationItem>
        {pages.map((page) => {
          const to = new URLSearchParams(searchParams);
          to.set("page", String(page));
          return (
            <PaginationLink
              key={page}
              to={`?${to.toString()}`}
              isActive={page === pageNumber}
            >
              {page}
            </PaginationLink>
          );
        })}
        <PaginationItem>
          <PaginationNext to={`?${nextTo.toString()}`} />
        </PaginationItem>
        <PaginationItem>
          <span className="flex items-center gap-1 text-sm ml-3 font-medium" translate="no">
            Go to page
            <Input
              key={pageNumber}
              ref={inputRef}
              type="number"
              min={1}
              max={totalPages}
              defaultValue={pageNumber}
              onKeyDown={handleKeyDown}
              className="h-9 w-14 text-center px-1 py-0 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              aria-label={`Go to page (1–${totalPages})`}
            />
            of {totalPages}
            <Button
              variant="ghost"
              size="icon"
              onClick={doJump}
              aria-label="Go to page"
            >
              <CornerDownLeft className="h-4 w-4" />
            </Button>
          </span>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
