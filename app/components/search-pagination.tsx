import { useSearchParams } from "@remix-run/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

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
  const [searchParams] = useSearchParams();

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
      </PaginationContent>
    </Pagination>
  );
}
