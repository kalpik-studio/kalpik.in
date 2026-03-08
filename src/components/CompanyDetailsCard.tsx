import { InfoBox } from "./InfoBox";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export type AddressesResponse = {
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

export function CompanyDetailsCard({
  company,
  address,
  children,
  contentChildren,
}: {
  company: { website: string; gstin: string; logo?: string };
  address?: AddressesResponse;
  children?: React.ReactNode;
  contentChildren?: React.ReactNode;
}) {
  const { website, gstin, logo } = company;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Details</CardTitle>
        {children}
      </CardHeader>

      <CardContent className={"grid gap-4 @md:grid-cols-2"}>
        {contentChildren}
        <InfoBox label="Logo">
          {logo ? (
            <img
              src={logo}
              alt="logo"
              className="h-12 object-contain bg-black dark:bg-white border rounded-sm"
            />
          ) : (
            <span>-</span>
          )}
        </InfoBox>

        <InfoBox label="Website">
          <a
            href={website}
            target="_blank"
            className="text-link"
            rel="noreferrer"
          >
            {website}
          </a>
        </InfoBox>
        <InfoBox label="GSTIN" className="font-bold">
          {gstin}
        </InfoBox>

        <CompanyAddressInfoBox address={address} />
      </CardContent>
    </Card>
  );
}

function CompanyAddressInfoBox({ address }: { address?: AddressesResponse }) {
  if (!address) return <InfoBox label="Address">-</InfoBox>;

  return (
    <InfoBox label="Address">
      <p>{address.streetAddress}</p>
      <p>
        {address.city}, {address.state} - {address.pincode}, {address.country}
      </p>
    </InfoBox>
  );
}
