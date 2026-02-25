export function ErrorMessage({
  message,
}: {
  message: string | undefined | false | null;
}): JSX.Element | null {
  if (!message || typeof message !== "string") return null;

  return (
    <p
      className="whitespace-pre-wrap text-red-600 dark:text-red-400"
      role="alert"
    >
      Error: {message}
    </p>
  );
}
