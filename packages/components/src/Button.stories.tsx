import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  AddButtonLink,
  Button,
  CloseButton,
  CopyButton,
  DeleteFormIconButton,
  DownloadButton,
  EditButtonLink,
  ResetFilterButtonLink,
  ViewButtonLink,
} from "./Button";
import { Icon, IconName } from "./Icon";

const component = Button;
const icon = <Icon key="icon" name={IconName.PLUS_CIRCLE} />;
const handleClick: () => void = fn;

export default {
  component,
  args: { children: "Button", onClick: handleClick },
  tags: ["autodocs"],
} satisfies Meta<typeof component>;

type Story = StoryObj<typeof component>;

export const VariantDefault: Story = {};
export const VariantSecondary: Story = { args: { variant: "secondary" } };
export const VariantOutline: Story = { args: { variant: "outline" } };
export const VariantLink: Story = { args: { variant: "link" } };
export const VariantDestructive: Story = { args: { variant: "destructive" } };
export const VariantDestructiveOutline: Story = {
  args: { variant: "destructiveOutline" },
};
export const VariantDestructiveLink: Story = {
  args: { variant: "destructiveLink" },
};
export const SizeIcon: Story = { args: { size: "icon", children: icon } };
export const SizeLarge: Story = { args: { size: "lg" } };
export const SizeSmall: Story = { args: { size: "sm" } };

// Custom

export const CustomClose: StoryObj<typeof CloseButton> = {
  render: CloseButton,
};
export const CustomDownload: StoryObj<typeof DownloadButton> = {
  render: DownloadButton,
  args: { children: "" },
};
export const CustomDelete: StoryObj<typeof DeleteFormIconButton> = {
  render: DeleteFormIconButton,
  args: { children: "" },
};
export const CustomAdd: StoryObj<typeof AddButtonLink> = {
  render: AddButtonLink,
  args: { children: "" },
};
export const CustomView: StoryObj<typeof ViewButtonLink> = {
  render: ViewButtonLink,
  args: { children: "" },
};
export const CustomEdit: StoryObj<typeof EditButtonLink> = {
  render: EditButtonLink,
  args: { children: "" },
};
export const CustomReset: StoryObj<typeof ResetFilterButtonLink> = {
  render: (props) => <ResetFilterButtonLink {...props} />,
  args: { enabled: true },
};
export const CustomCopyButton: StoryObj<typeof CopyButton> = {
  render: (props) => <CopyButton {...props} />,
  args: { value: "This is copied", title: "Copy me" },
};
