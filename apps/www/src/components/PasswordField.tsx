import { useState } from "react";
import { Icon, IconName } from "./Icon";
import { TextField } from "./TextField";

export type PasswordFieldProps = {
  label?: string;
  placeholder?: string;
  name?: string;
  description?: string;
  autoComplete?:
    | "current-password"
    | "new-password"
    | "confirm-password"
    | "off";
  errorMessage?: string;
};

export function PasswordField({
  label = "Password",
  name = "password",
  placeholder,
  autoComplete = "current-password",
  description = "Should be at least 8 characters long.",
  errorMessage,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField
      label={label}
      type={isVisible ? "text" : "password"}
      name={name}
      required
      placeholder={placeholder}
      autoComplete={autoComplete}
      description={description}
      errorMessage={errorMessage}
      minLength={8}
      maxLength={72}
      suffix={
        <button
          type="button"
          onClick={() => setIsVisible((v) => !v)}
          className="relative top-2 text-foreground/75 p-2"
          title={isVisible ? "Hide password" : "Show password"}
        >
          <Icon name={isVisible ? IconName.EYE_OFF : IconName.EYE} size="sm" />
        </button>
      }
    />
  );
}
