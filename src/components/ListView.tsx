import { NavLink, Outlet } from "react-router";
import { cn } from "~/utils/cn";
import type { LinkTo } from "~/utils/remix";
import { MainView, type MainViewProps } from "./MainView";

export type ListViewItem = { to: LinkTo; children: React.ReactNode };

export type ListViewProps = Omit<MainViewProps, "children"> & {
  list: ListViewItem[];
};

export function ListView({
  list,
  caption,
  ...props
}: ListViewProps): React.ReactNode {
  return (
    <MainView
      {...props}
      layout={"tabular"}
      aside={<Outlet />}
      mainClassName="max-w-96"
    >
      {caption ? (
        <div
          className={cn(
            "sticky top-0 bg-muted px-4 py-2",
            "text-left text-sm font-bold uppercase text-muted-foreground",
          )}
        >
          {caption}
        </div>
      ) : null}
      <ul className="flex flex-col gap-2 p-2">
        {list.map(({ to, children }) => (
          <li key={to.toString()}>
            <NavLink
              to={to}
              className={({ isActive, isPending }) =>
                cn(
                  "flex justify-between items-center rounded border p-2 hover:bg-secondary",
                  (isActive || isPending) && "font-bold",
                  isPending && "opacity-75",
                )
              }
            >
              {children}
            </NavLink>
          </li>
        ))}
      </ul>
    </MainView>
  );
}
