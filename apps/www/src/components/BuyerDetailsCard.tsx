import { useState } from "react";
import { Link } from "react-router";
import type { LinkTo } from "react-router/types";
import type { BuyerWithDetails } from "~/buyers/api";
import type { CustomersWithPreferencesResponse } from "~/pocketbase/custom";
import type { AddressesResponse } from "~/pocketbase/types";
import { Icon, IconName } from "./Icon";

export function BuyerDetailsCard({
  company,
  link,
  defaultExpanded,
  customer,
}: {
  company: BuyerWithDetails;
  customer?: CustomersWithPreferencesResponse | null;
  link?: LinkTo;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded || false);

  return (
    <article className="flex gap-x-4 gap-y-2 rounded-md border bg-card p-2">
      <LogoColumn logo={company.logo} />

      <div className="flex flex-1 flex-col">
        <Heading
          name={company.name}
          expanded={expanded}
          setExpanded={setExpanded}
          link={link}
        />

        {expanded ? (
          <>
            <AddressLine address={company.expand?.address} />
            <p className="text-sm font-medium">GSTIN: {company.gstin}</p>
          </>
        ) : null}

        {customer && (
          <>
            <hr className="my-1" />
            <CustomerDetails {...customer} />
          </>
        )}
      </div>

      <RatingColumn rating={company.rating} website={company.website} />
    </article>
  );
}

function LogoColumn({ logo }: { logo?: string }) {
  return logo ? (
    <img
      src={logo}
      alt="logo"
      className="h-12 w-12 object-contain"
      onError={(e) => (e.currentTarget.hidden = true)}
    />
  ) : (
    <div />
  );
}

function Heading({
  name,
  expanded,
  setExpanded,
  link,
}: {
  name: string;
  expanded: boolean;
  setExpanded: (expanded: React.SetStateAction<boolean>) => void;
  link?: LinkTo;
}) {
  return (
    <div className="flex flex-1 justify-between ">
      <h4 className="text-lg font-medium">
        {link ? <Link to={link}>{name}</Link> : name}
      </h4>

      <button
        type="button"
        className="text-link"
        onClick={() => setExpanded((val) => !val)}
        title={expanded ? "View less details" : "View more details"}
      >
        <Icon name={expanded ? IconName.MINUS_CIRCLE : IconName.PLUS_CIRCLE} />
      </button>
    </div>
  );
}

export function AddressLine({ address }: { address?: AddressesResponse }) {
  if (!address) return null;

  const addressLine = [
    address.streetAddress,
    address.city,
    [address.state, address.pincode].filter(Boolean).join(" - "),
    address.country,
  ]
    .filter(Boolean)
    .join(", ");

  return <p>{addressLine}</p>;
}

function RatingColumn({
  rating,
  website,
  compact,
}: {
  rating: number;
  website?: string;
  compact?: boolean;
}) {
  return (
    <div className="flex w-max flex-col justify-between text-right">
      <div className="flex flex-col">
        <span>
          <strong>{rating.toFixed(1)}</strong> / 5
        </span>
        {compact ? null : <p className="text-sm uppercase">Rating</p>}
      </div>
      {website ? (
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className="text-link"
          title="Visit buyer's website"
        >
          Website
        </a>
      ) : null}
    </div>
  );
}

function CustomerDetails(customer: CustomersWithPreferencesResponse) {
  return (
    <div className="flex flex-row justify-between">
      <p className="font-medium">{customer?.name}</p>
      <p className="flex flex-row gap-4 text-link">
        {customer.email ? (
          <a href={`mailto:${customer.email}`} target="_blank" rel="noreferrer">
            Email
          </a>
        ) : null}

        {customer.mobileNumber ? (
          <a
            href={`tel:${customer.mobileNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            Call
          </a>
        ) : null}
      </p>
    </div>
  );
}
