import type { ProductTypesResponse } from "@innbell/pocketbase/types";
import {
  transformItemToSelectOption,
  type WithChildren,
} from "@innbell/pocketbase/utils";
import { CheckboxControlledFieldset } from "./CheckboxFieldset";
import { CardCollapsible } from "./ui/card";

export type ProductsFieldsetProps = {
  allProducts: WithChildren<{
    id: string;
    collectionName: string;
    name: string;
  }>[];
  selectedProducts?: ProductTypesResponse[];
  defaultOpen?: boolean;
};

export function ProductsFieldset({
  allProducts,
  selectedProducts,
  defaultOpen,
}: ProductsFieldsetProps) {
  return (
    <fieldset className="flex-col-4 min-w-0">
      <legend className="text-lg">Products & services *</legend>

      {allProducts.map((topCategory) => (
        <div key={topCategory.id} className="flex-col-2">
          <p className="font-bold">{topCategory.name}</p>
          {topCategory.children?.map((category) => {
            if (!category.children || category.children.length === 0)
              return null;

            return (
              <CardCollapsible
                summary={category.name}
                key={category.id}
                open={defaultOpen}
                className="@container"
              >
                <CategoriesAndProducts
                  category={category}
                  selectedProducts={selectedProducts}
                />
              </CardCollapsible>
            );
          })}
        </div>
      ))}
    </fieldset>
  );
}

function CategoriesAndProducts({
  category,
  selectedProducts,
}: {
  category: ProductsFieldsetProps["allProducts"][number];
  selectedProducts: ProductsFieldsetProps["selectedProducts"];
}) {
  const categories =
    category.children?.filter(
      (c) => c.collectionName === "product_categories",
    ) || [];
  const products =
    category.children?.filter((c) => c.collectionName === "product_types") ||
    [];

  return (
    <div className="flex-col-4">
      {products.length > 0 ? (
        <div className="ml-4">
          <CheckboxControlledFieldset
            label={""}
            name="products"
            options={products.map(transformItemToSelectOption)}
            selectedOptions={selectedProducts?.map(transformItemToSelectOption)}
            selectAllOption
            selectAllBlock
          />
        </div>
      ) : null}

      {categories.map((category) => (
        <ProductsFieldsetCategoryField
          key={category.id}
          category={category}
          selectedProducts={selectedProducts}
        />
      ))}
    </div>
  );
}

function ProductsFieldsetCategoryField({
  category,
  selectedProducts,
}: {
  category: ProductsFieldsetProps["allProducts"][number];
  selectedProducts: ProductsFieldsetProps["selectedProducts"];
}) {
  return (
    <div>
      <p className="font-medium">{category.name}</p>

      <CategoriesAndProducts
        category={category}
        selectedProducts={selectedProducts}
      />
    </div>
  );
}
