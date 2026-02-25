import { createElement, isValidElement } from "react";
import { Link, useLocation } from "@innbell/router";
import { AwaitWithSuspense } from "@innbell/router/utils";
import { cn } from "@innbell/utils/cn";
import { capitalize } from "@innbell/utils/text";
import { Icon, IconName } from "./Icon";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableUI,
} from "./ui/table";

const preservedIds = ["actions", "select"] as const;

export type TableData<T extends object> =
  | T[]
  | Promise<T[]>
  | Promise<{ items: T[] }>;

export interface TableProps<T extends object> {
  caption?: string;
  data: TableData<T>;
  columns: TableColumnProps<T>[];
  className?: string;
  captionClassName?: string;
  headRowClassName?: string;
  headCellClassName?: string;
  bodyRowClassName?: string;
  bodyCellClassName?: string;
  currentSort?: string;
  onBodyRowClick?: (
    row: T,
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => void;
}

export interface TableColumnProps<T extends object> {
  id: keyof T | (typeof preservedIds)[number];
  headerClassName?: string;
  cellClassName?: string;
  header?: React.ReactNode | ((data: T[]) => React.ReactNode);
  cell?: (row: T, data: T[]) => React.ReactNode;
  sort?: string;
}

export function Table<T extends object>(props: TableProps<T>) {
  const {
    columns,
    caption,
    captionClassName,
    className,
    data,
    bodyCellClassName,
    bodyRowClassName,
    headCellClassName,
    headRowClassName,
    onBodyRowClick,
    currentSort,
  } = props;

  return (
    <TableUI className={cn(className)}>
      {caption && (
        <TableCaption className={cn(captionClassName)}>{caption}</TableCaption>
      )}

      <TableHeader>
        <TableRow className={cn("hover:bg-transparent", headRowClassName)}>
          {columns.map((column) => (
            <ColumnHeader
              key={column.id.toString()}
              headCellClassName={headCellClassName}
              column={column}
              data={data}
              currentSort={currentSort}
            />
          ))}
        </TableRow>
      </TableHeader>
      <AwaitWithSuspense
        resolve={data}
        fallback={<TableBody />}
        errorElement={<TableBody />}
      >
        {(data) => {
          const items = Array.isArray(data) ? data : data.items;
          return (
            <TableBody>
              {items.map((row, i) => (
                <TableRow
                  key={row.toString() + i}
                  className={cn(
                    "even:bg-accent/20",
                    onBodyRowClick && "cursor-pointer hover:bg-secondary/50",
                    bodyRowClassName,
                  )}
                  onClick={(e) => onBodyRowClick?.(row, e)}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id.toString()}
                      className={cn(
                        "px-4",
                        bodyCellClassName,
                        column.cellClassName,
                      )}
                    >
                      {getCellElement(column, row, items)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          );
        }}
      </AwaitWithSuspense>
    </TableUI>
  );
}

function ColumnHeader<T extends object>({
  column,
  data,
  headCellClassName,
  currentSort,
}: {
  column: TableColumnProps<T>;
  data: TableData<T>;
  headCellClassName?: string;
  currentSort?: string;
}) {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const sort: {
    current: "asc" | "desc" | null;
    icon: React.ReactNode;
    next: string | undefined;
  } =
    column.sort === currentSort
      ? {
          current: "asc",
          icon: <Icon name={IconName.SORT_ASC} />,
          next: `-${column.sort}`,
        }
      : `-${column.sort}` === currentSort
        ? {
            current: "desc",
            icon: <Icon name={IconName.SORT_DESC} />,
            next: column.sort,
          }
        : {
            current: null,
            icon: <Icon name={IconName.CHEVRONS_UP_DOWN} />,
            next: column.sort,
          };

  searchParams.set("sort", sort.next ?? "");

  return (
    <TableHead
      key={column.id.toString()}
      className={cn("px-4", headCellClassName, column.headerClassName)}
    >
      {column.sort ? (
        <Link
          className="flex items-center gap-2"
          to={{ search: searchParams.toString() }}
          title="Click to sort column"
        >
          <HeaderElement column={column} data={data} />
          {sort.icon}
        </Link>
      ) : (
        <HeaderElement column={column} data={data} />
      )}
    </TableHead>
  );
}

function HeaderElement<T extends object>({
  column,
  data,
}: {
  column: TableColumnProps<T>;
  data: TableData<T>;
}): React.ReactNode {
  const { id, header } = column;
  const fallback = capitalize(id.toString());

  if (typeof header !== "function") {
    return header ?? fallback;
  }

  return (
    <AwaitWithSuspense
      resolve={data}
      fallback={fallback}
      errorElement={fallback}
    >
      {(data) => {
        const items = Array.isArray(data) ? data : data.items;
        return header(items);
      }}
    </AwaitWithSuspense>
  );
}

function getCellElement<T extends object>(
  column: TableColumnProps<T>,
  row: T,
  data: T[],
): React.ReactNode {
  const { id, cell } = column;

  // eslint-disable-next-line - no-explicit-any
  const content: any =
    typeof id === "string" &&
    preservedIds.includes(id as (typeof preservedIds)[number])
      ? null
      : (row?.[id as keyof T] ?? null);

  if (cell?.name.match(/^[A-Z].*/)) {
    const element = createElement(cell, row);
    if (isValidElement(element)) return element;
  }

  return cell?.(row, data) ?? content;
}
