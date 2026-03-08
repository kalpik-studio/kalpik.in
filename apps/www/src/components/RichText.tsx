import Markdown from "markdown-to-jsx";
import { Fragment, useMemo } from "react";

export function RichText({
  children,
  className,
}: {
  children: string;
  className?: string;
}): JSX.Element {
  const options: React.ComponentProps<typeof Markdown>["options"] =
    useMemo(() => {
      return {
        wrapper: className
          ? ({ children }) => <div className={className}>{children}</div>
          : Fragment,
        overrides: { ul: UL, p: P },
        namedCodesToUnicode: {
          ldquo: '"',
          rdquo: '"',
        },
      };
    }, [className]);

  return <Markdown options={options}>{children}</Markdown>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-inside list-disc">{children}</ul>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-justify">{children}</p>;
}
