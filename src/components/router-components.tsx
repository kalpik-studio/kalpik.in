import { useLocation } from "react-router";

export function CurrentPathSearchHiddenInput({
  name = "redirectTo",
}: {
  name?: string;
}): React.ReactNode {
  const { pathname, search } = useLocation();

  return <input type="hidden" name={name} value={`${pathname}?${search}`} />;
}
