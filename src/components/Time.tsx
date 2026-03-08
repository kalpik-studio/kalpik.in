import { formatAsLocalDate, formatAsLocalDateTime } from "~/utils/date-time";

export type TimeProps = {
  className?: string;
  title?: string;
} & ({ date: string | Date | number } | { dateTime: string | Date | number });

export function Time(props: TimeProps): JSX.Element {
  if ("date" in props) {
    return (
      <time
        suppressHydrationWarning
        className={props.className}
        dateTime={props.date.toString()}
        title={props.title}
      >
        {formatAsLocalDate(props.date)}
      </time>
    );
  }

  if ("dateTime" in props) {
    return (
      <time
        suppressHydrationWarning
        className={props.className}
        dateTime={props.dateTime.toString()}
        title={props.title}
      >
        {formatAsLocalDateTime(props.dateTime)}
      </time>
    );
  }

  throw new Error("Invalid Date/Time prop");
}
