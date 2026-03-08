import React from "react";

const scrollClassName = "overflow-y-auto";

export function useScrollToTopButtonArea<
  T extends HTMLElement = HTMLDivElement,
>(): {
  buttonAreaElement: JSX.Element;
  contentRef: React.RefObject<T>;
} {
  const contentRef = React.useRef<T>(null);

  const handleClick = React.useCallback(() => {
    const container = contentRef.current;
    if (!container) return;
    if (container.classList.contains(scrollClassName)) {
      return container.scrollTo({ top: 0, behavior: "smooth" });
    }
    const scrollElement = container
      .getElementsByClassName(scrollClassName)
      .item(0);
    return scrollElement?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const buttonAreaElement = React.useMemo(
    () => (
      <button
        type="button"
        className="fixed left-0 top-0 z-[1] h-4 w-screen bg-transparent"
        onClick={handleClick}
      />
    ),
    [handleClick],
  );

  return { buttonAreaElement, contentRef };
}
