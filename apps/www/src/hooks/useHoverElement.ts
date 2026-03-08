import { useMemo, useState } from "react";

export function useHoverElement(): {
  isHovering: boolean;
  elementProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
  };
} {
  const [isHovering, setIsHovering] = useState(false);
  const elementProps = useMemo(
    () => ({
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => setIsHovering(false),
      onFocus: () => setIsHovering(true),
      onBlur: () => setIsHovering(false),
    }),
    [],
  );

  return { isHovering, elementProps };
}
