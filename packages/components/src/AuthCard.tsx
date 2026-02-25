import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { Form } from "@innbell/router";
import { Turnstile } from "@innbell/turnstile";
import { Button } from "./Button";
import { CopyrightFooter } from "./CopyrightFooter";
import { ErrorMessage } from "./ErrorMessage";
import { Icon, IconName } from "./Icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export type AuthCardProps = {
  children: React.ReactNode;
  description?: string;
  errorMessage?: string;
  footer?: React.ReactNode;
  submitLabel: string;
  title: string;
  turnstileId: string;
};

export function AuthCard({
  children,
  description,
  errorMessage,
  footer,
  submitLabel,
  title,
  turnstileId,
}: AuthCardProps): React.ReactNode {
  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <Icon
          name={IconName.INNBELL}
          label="InnBell"
          className="text-5xl mb-8"
        />
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>

      <CardContent>
        <Form method="POST" className="flex-col-4">
          {children}

          <Turnstile id={turnstileId} />
          <Button type="submit">{submitLabel}</Button>

          <ErrorMessage message={errorMessage} />
          <AuthenticityTokenInput />
        </Form>
      </CardContent>

      <CardFooter className="flex-col items-start">
        {footer}
        <CopyrightFooter className="mt-4" />
      </CardFooter>
    </Card>
  );
}
