import { Tag } from "./Tag";

export function CompanyStatusTag({
  approved,
  verified,
}: {
  approved: boolean;
  verified: boolean;
}) {
  return approved ? (
    <Tag variant="success">Approved</Tag>
  ) : verified ? (
    <Tag variant="error">Pending approval</Tag>
  ) : (
    <Tag variant="error">Under verification</Tag>
  );
}
