import { cn } from "~/utils/cn";

export type TreeProps = {
  nodes: TreeNode[];
  expandedIds?: string[];
  expandAll?: boolean;
};

export type TreeNode = {
  id: string;
  label: React.ReactNode;
  parent?: string;
  children?: TreeNode[];
};

export function Tree(props: TreeProps) {
  const { expandedIds, expandAll, nodes } = props;

  return (
    <ul className="">
      {nodes.map((node) => (
        <li key={node.id} className={cn("py-1 pl-4")}>
          {node.children && node.children.length > 0 ? (
            <details open={expandAll || expandedIds?.includes(node.id)}>
              <summary className="cursor-pointer">{node.label}</summary>

              <Tree {...props} nodes={node.children} />
            </details>
          ) : (
            <div className="pl-4">{node.label}</div>
          )}
        </li>
      ))}
    </ul>
  );
}
