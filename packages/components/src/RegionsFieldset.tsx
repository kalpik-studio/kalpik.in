import { useCallback, useMemo, useState } from "react";
import type {
  RegionCategoriesResponse,
  RegionsResponse,
} from "@innbell/pocketbase/types";
import { transformItemToSelectOption } from "@innbell/pocketbase/utils";
import { Button } from "./Button";
import { CheckboxFieldset } from "./CheckboxFieldset";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function RegionsFieldset({
  allRegions,
  allRegionCategories,
  selectedRegions,
}: {
  allRegions: RegionsResponse[];
  allRegionCategories: RegionCategoriesResponse[];
  selectedRegions?: RegionsResponse[];
}) {
  const selectionOptions = useMemo(
    () => (selectedRegions ?? []).map(transformItemToSelectOption),
    [selectedRegions],
  );

  const [selected, setSelected] = useState(selectionOptions);

  const handleSelect = useCallback((category: RegionCategoriesResponse) => {
    setSelected(
      category.regions.map((region) => ({ value: region, label: region })),
    );
  }, []);

  const handleNone = useCallback(() => setSelected([]), []);

  const handleReset = useCallback(
    () => setSelected(selectionOptions),
    [selectionOptions],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regions of service</CardTitle>
      </CardHeader>
      <CardContent>
        <CheckboxFieldset
          key={selected.join("")}
          name="regions"
          label="Select regions"
          options={allRegions.map(transformItemToSelectOption)}
          selectedOptions={selected}
          required
        />
      </CardContent>
      <CardFooter className="flex-col-2 items-start">
        <CardDescription>
          Select a region-category to auto-select multiple regions.
        </CardDescription>
        {allRegionCategories.length === 0 ? null : (
          <div className="flex-row-2 flex-wrap">
            {allRegionCategories.map((category) => (
              <Button
                key={category.id}
                size={"sm"}
                variant="outline"
                onClick={() => handleSelect(category)}
              >
                {category.name}
              </Button>
            ))}

            <Button
              key={"none"}
              size={"sm"}
              variant="outline"
              onClick={handleNone}
            >
              None
            </Button>

            <Button
              key={"reset"}
              size={"sm"}
              variant="ghost"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
