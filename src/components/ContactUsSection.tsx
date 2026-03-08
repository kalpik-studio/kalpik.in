import { useFetcher } from "react-router";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { Button, ButtonLink } from "~/components/Button.tsx";
import { ErrorMessage } from "~/components/ErrorMessage.tsx";
import { Icon, IconName } from "~/components/Icon.tsx";
import { Select, type SelectOption } from "~/components/Select.tsx";
import { TextArea } from "~/components/TextArea.tsx";
import { TextField } from "~/components/TextField.tsx";
import { WwwRoute } from "~/routes-manifest";
import { PublicSection } from "./PublicSection";

const reasonOptions: SelectOption[] = [
  "General Inquiry",
  "Hotel Project",
  "F&B/Restaurant",
  "Corporate Interior/Exterior",
].map((reason) => ({
  label: reason,
  value: reason,
}));

export function ContactUsSection() {
  const fetcher = useFetcher<{
    status?: "success";
    error?: string;
    errors?: Record<string, string>;
  }>({ key: "contact-us" });

  if (fetcher.data?.status === "success") {
    return (
      <PublicSection
        id="contact"
        title="Thank you"
        subTitle={"You will receive latest news about InnBell"}
      >
        <ButtonLink to={WwwRoute.ABOUT}>Learn more about InnBell</ButtonLink>
      </PublicSection>
    );
  }

  const errors = fetcher.data?.errors || {};

  return (
    <PublicSection
      id="contact"
      title="Initiate a Project Discussion"
      subTitle={
        "Connect to discuss technical advisory and project management for your upcoming development."
      }
    >
      <fetcher.Form method="POST" className="w-full grid md:grid-cols-2 gap-8">
        <fieldset className="flex-col-4 flex-1">
          <TextField
            label="Your name"
            name="name"
            required
            errorMessage={errors["name"]}
          />
          <TextField
            label="Your email"
            name="email"
            required
            errorMessage={errors["email"]}
          />
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            required
            errorMessage={errors["mobileNumber"]}
          />

          <TextField
            label="Company Name (optional)"
            name="companyName"
            errorMessage={errors["companyName"]}
          />
          <TextField
            label="Company Website (optional)"
            name="companyWebsite"
            placeholder="https://"
            errorMessage={errors["companyWebsite"]}
          />
        </fieldset>

        <fieldset className="flex-col-4 flex-1">
          <Select
            label="Reason"
            name="subject"
            options={reasonOptions}
            required
            defaultLabel="Select a reason"
            // disableDefaultOption
            errorMessage={errors["subject"]}
          />
          <TextArea
            label="Message (optional)"
            name="message"
            rows={10}
            errorMessage={errors["message"]}
          />

          <Button
            type="submit"
            name="intent"
            value="contact-enquiry"
            size={"lg"}
            className="items-center"
            disabled={fetcher.state !== "idle"}
          >
            <Icon name={IconName.SEND} />
            {fetcher.state === "idle" ? "Send enquiry" : "Sending..."}
          </Button>

          <ErrorMessage message={fetcher.data?.error} />

          <AuthenticityTokenInput />
        </fieldset>
      </fetcher.Form>
    </PublicSection>
  );
}
