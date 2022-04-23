import { Link, useSearchParams } from '@remix-run/react';

type PaginationProps = {
  total: number;
  pageSize: number;
  currentPage: number;
};

const maxVisiblePages = 9;

export default function Pagination({ total, pageSize, currentPage }: PaginationProps) {
  const [searchParams] = useSearchParams();

  const totalPages = Math.ceil(total / pageSize);
  const startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);

  const pages: number[] = [];
  for (let i = startPage; i < startPage + maxVisiblePages; i++) {
    if (i > totalPages) break;
    pages.push(i);
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <div className="pagination-inner">
        {pages.map((page) => {
          const to = new URLSearchParams(searchParams);
          to.set('page', String(page));
          return (
            <Link
              className="pagination-page"
              key={page}
              to={`?${to.toString()}`}
              data-current={page === currentPage}
            >
              {page}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
