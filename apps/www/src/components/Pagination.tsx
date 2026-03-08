import type { ListResult } from "pocketbase";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { AwaitWithSuspense } from "react-router/utils";
import { defaultPageSize, pageSizeOptions } from "~/constants/pagination";
import { cn } from "~/utils/cn";
import { calculateVisiblePages } from "~/utils/pagination";
import { Select } from "./Select";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationUI,
} from "./ui/pagination";

export type PaginationFooterProps = Omit<ListResult<unknown>, "items"> & {
  count?: number;
  items?: unknown[];
};

export function AsyncPaginationFooter({
  list,
}: {
  list: Promise<PaginationFooterProps>;
}) {
  const fallback = (
    <PaginationFooter
      page={1}
      totalItems={-1}
      perPage={defaultPageSize}
      totalPages={1}
    />
  );

  return (
    <AwaitWithSuspense
      resolve={list}
      fallback={fallback}
      errorElement={fallback}
    >
      {(list) => <PaginationFooter {...list} />}
    </AwaitWithSuspense>
  );
}

export function PaginationFooter({
  page,
  totalItems,
  totalPages,
  perPage,
}: PaginationFooterProps) {
  const isSinglePage = totalPages <= 1;
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalItems);

  return (
    <div className="flex w-full items-center justify-center gap-4 sm:justify-between">
      <div
        className={cn(
          "text-sm text-muted-foreground",
          !isSinglePage && "hidden sm:block",
        )}
      >
        {totalItems < 0
          ? "Loading..."
          : totalItems === 0
            ? "No results found"
            : start > totalItems
              ? `The page (${page}) does not exist`
              : `Showing ${start}-${end} of ${totalItems} results`}
      </div>

      {isSinglePage ? null : <Pagination page={page} totalPages={totalPages} />}

      {totalItems > 20 ? <PaginationSizePicker perPage={perPage} /> : null}
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}): JSX.Element | null {
  const genSearch = usePageChange(totalPages);

  if (totalPages <= 1) return null;

  return (
    <PaginationUI className="m-0 w-max">
      <PaginationContent>
        {/* <PaginationFirst disabled={page === 1} to={{ search: genSearch(1) }} /> */}
        <PaginationPrevious
          disabled={page === 1}
          to={{ search: genSearch(page - 1) }}
          className="hidden sm:flex"
        />

        <PaginationPages page={page} totalPages={totalPages} key={page} />

        <PaginationNext
          disabled={page === totalPages}
          to={{ search: genSearch(page + 1) }}
          className="hidden sm:flex"
        />
        {/* <PaginationLast
          disabled={page === totalPages}
          to={{ search: genSearch(totalPages) }}
        /> */}
      </PaginationContent>
    </PaginationUI>
  );
}

function PaginationSizePicker({ perPage }: { perPage: number }) {
  const { search } = useLocation();
  const navigate = useNavigate();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const searchParams = new URLSearchParams(search);
      const newSize = event.target.value || defaultPageSize.toString();
      searchParams.set("perPage", newSize);
      navigate({ search: searchParams.toString() });
    },
    [search, navigate],
  );

  return (
    <Select
      key={perPage}
      options={pageSizeOptions}
      label="Page size"
      inlineLabel
      name="perPage"
      value={perPage.toString()}
      disableDefaultOption
      onChange={handleChange}
      fieldClassName="hidden w-24 sm:flex"
      className="min-w-max"
    />
  );
}

function PaginationPages({
  page: currentPage,
  totalPages,
}: {
  page: number;
  totalPages: number;
}): JSX.Element | (JSX.Element | null)[] | null {
  return calculateVisiblePages(totalPages, currentPage).map((page, index) =>
    page === 0 ? (
      <EllipsisElement key={`ellipsis-${index}`} />
    ) : (
      <PaginationPage
        key={page.toString()}
        page={page}
        active={currentPage === page}
        totalPages={totalPages}
      />
    ),
  );
}

function PaginationPage({
  page,
  totalPages,
  active,
}: {
  page: number;
  totalPages: number;
  active?: boolean;
}): JSX.Element | null {
  const genSearch = usePageChange(totalPages);

  return (
    <PaginationLink isActive={active} to={{ search: genSearch(page) }}>
      {page}
    </PaginationLink>
  );
}

const EllipsisElement = () => (
  <PaginationItem>
    <PaginationEllipsis />
  </PaginationItem>
);

function usePageChange(totalPages: number) {
  const { search } = useLocation();

  return useCallback(
    (page: number) => {
      const newPage = Math.min(Math.max(page, 1), totalPages);
      const searchParams = new URLSearchParams(search);
      searchParams.set("page", newPage.toString());

      return searchParams.toString();
    },
    [search, totalPages],
  );
}
