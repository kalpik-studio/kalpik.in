import { useEffect, useRef } from "react";
import { Form } from "react-router";
import { cn } from "~/utils/cn";
import { formatAsLocalDateTime } from "~/utils/date-time";
import { Button } from "./Button";
import { Icon, IconName } from "./Icon";
import { RichText } from "./RichText";
import { TextField } from "./TextField";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  extractInitials,
} from "./ui/avatar";

export enum ChatIntent {
  CreateMessage = "createChatMessage",
}

export function ChatWindow({
  messages,
  optimisticData,
  state,
  seenByIncoming,
  seenByOutgoing,
}: {
  messages: ChatMessageProps[];
  optimisticData?: FormData;
  state?: string;
  seenByOutgoing?: boolean;
  seenByIncoming?: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state]);

  const intent = optimisticData?.get("intent") as ChatIntent;
  const optimisticMessage =
    intent === ChatIntent.CreateMessage
      ? (optimisticData?.get("message") as string) || ""
      : undefined;

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-2">
      {messages.map((message, i, arr) => {
        const seen =
          arr.length - 1 === i
            ? message.outgoing
              ? seenByOutgoing
              : seenByIncoming
            : undefined;
        return <ChatMessage key={message.created} {...message} seen={seen} />;
      })}
      {optimisticMessage ? (
        <ChatMessage
          message={optimisticMessage}
          created={new Date().toISOString()}
          outgoing
          optimistic
        />
      ) : null}
      <div aria-hidden className="h-0 w-0 opacity-0" ref={bottomRef} />
    </main>
  );
}

export type ChatMessageProps = {
  message: string;
  created: string;
  outgoing?: boolean;
  optimistic?: boolean;
  user?: { name: string; avatar?: string; type?: string };
  seen?: boolean;
};

function ChatMessage({
  message,
  created,
  outgoing,
  optimistic,
  user,
  seen,
}: ChatMessageProps) {
  const clipPath = outgoing
    ? "polygon(0 0, 100% 100%, 0 100%)"
    : "polygon(0 100%, 100% 0, 100% 100%)";

  return (
    <article
      className={cn(
        "flex w-full items-end gap-2",
        outgoing ? "flex-row-reverse" : "",
      )}
    >
      {user ? (
        <Avatar className="relative bottom-0.5 size-8 rounded-full">
          {user.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name} title={user.name} />
          ) : null}
          <AvatarFallback title={user.name}>
            {extractInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      ) : null}

      <div
        className={cn(
          "relative flex h-max w-3/4 flex-col gap-1 rounded-lg border px-2 py-1",
          outgoing
            ? "ml-auto justify-end rounded-br-none bg-accent"
            : "justify-start rounded-bl-none bg-muted",
          optimistic && "opacity-75",
        )}
      >
        <div
          className={cn(
            "block font-mono text-xs leading-none text-muted-foreground",
          )}
          suppressHydrationWarning
        >
          {formatAsLocalDateTime(created)?.replace(",", "")}
          {user?.type ? ` - ${user.type}` : ""}
          {seen ? (
            <Icon
              name={IconName.CHECK}
              className="inline ml-2 text-accent-accent3 dark:text-accent-accent2"
            />
          ) : null}
        </div>
        <div className={cn("w-full leading-tight text-accent-foreground")}>
          <RichText>{message}</RichText>
        </div>

        <div
          className={cn(
            "absolute bottom-0 h-2 w-2",
            outgoing ? "-right-2 bg-accent" : "-left-2 bg-muted ",
          )}
          style={{ clipPath, WebkitClipPath: clipPath }}
          aria-hidden
        />
      </div>
    </article>
  );
}

export function ChatInput({ children }: { children?: React.ReactNode }) {
  return (
    <Form
      method="post"
      className="grid w-full grid-cols-[1fr_max-content] items-center gap-2"
    >
      <TextField
        label=""
        name="message"
        placeholder="Enter your reply..."
        maxLength={200}
        required
        autoComplete="off"
        autoFocus
      />
      {children}
      <Button intent={ChatIntent.CreateMessage}>Send</Button>
    </Form>
  );
}
