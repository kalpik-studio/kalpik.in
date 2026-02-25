import { statesOfIndia } from "@innbell/constants/states-of-india";
import type { AddressesResponse } from "@innbell/pocketbase/types";
import { Select } from "./Select";
import { TextField } from "./TextField";

const stateOptions = statesOfIndia.map((state) => ({
  label: state,
  value: state,
}));

export function AddressFieldset({
  address,
}: {
  address?: Partial<AddressesResponse>;
}) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-4">
      <legend className="mb-2 text-lg">Company address</legend>
      <input type="hidden" name="address" value={address?.id} />

      <TextField
        label="Street address"
        name="streetAddress"
        type="text"
        required
        defaultValue={address?.streetAddress}
        autoComplete="street-address"
      />

      <div className="grid w-full grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-4">
        <TextField
          label="City"
          name="city"
          type="text"
          required
          defaultValue={address?.city}
          autoComplete="address-level2"
        />
        <TextField
          label="PIN code"
          name="pincode"
          type="text"
          required
          defaultValue={address?.pincode}
          pattern="^\d{6}$"
          autoComplete="postal-code"
        />
        <Select
          label="State"
          name="state"
          defaultLabel={"Select a state"}
          defaultValue={address?.state || ""}
          required
          options={stateOptions}
          disableDefaultOption
          autoComplete="address-level1"
        />
        <TextField
          label="Country"
          name="country"
          type="text"
          required
          readOnly
          defaultValue={address?.country || "India"}
          autoComplete="country-name"
        />
      </div>
    </fieldset>
  );
}
