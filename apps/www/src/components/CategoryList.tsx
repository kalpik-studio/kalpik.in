import { Link } from "react-router";
import type { LinkTo } from "react-router/types";
import { cn } from "~/utils/cn";
import { Img } from "./Img";

export function CategoryAndProductList({
  categories,
  products,
}: {
  categories?: CategoryCardProps[];
  products?: CategoryCardProps[];
}) {
  return (
    <>
      {categories && categories.length > 0 ? (
        <CategoryList list={categories} />
      ) : null}

      {products && products.length > 0 ? (
        <>
          <h5
            className={cn(
              "text-lg font-semibold",
              categories && categories.length > 0 ? "mt-4" : "",
            )}
          >
            Products
          </h5>
          <div className="grid w-full gap-2 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

function CategoryList({ list = [] }: { list: CategoryCardProps[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {list.map((c) => (
        <CategoryCard key={c.id} {...c} />
      ))}
    </div>
  );
}

// iron, vit-D, thyroid, sugar, Magnesium, Potassium, Vit-B

export type CategoryCardProps = {
  id: string;
  children: React.ReactNode;
  imageUrl?: string;
  imageBlurhash?: string;
  linkHref: LinkTo;
};

function CategoryCard({
  children,
  imageUrl = "/images/innBell-logo-outline-w.png",
  linkHref,
  imageBlurhash,
}: CategoryCardProps) {
  return (
    <Link
      to={linkHref}
      className={cn(
        "flex items-end rounded-md bg-secondary px-4 py-2 text-start text-lg",
        "aspect-video max-h-[160px] w-full md:max-h-[240px] overflow-hidden",
        "relative border bg-cover bg-center hover:brightness-90 text-white",
      )}
    >
      <Img
        src={imageUrl}
        className="absolute inset-0 z-0"
        alt={children?.toString() ?? "Product category"}
        blurhash={imageBlurhash}
        width={400}
        height={200}
      />

      <div
        role="none"
        className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/0 flex flex-center"
      />

      <span
        className={cn("relative z-10", "[text-shadow:_0_0_8px_rgb(0_0_0)]")}
      >
        {children}
      </span>
    </Link>
  );
}

function ProductCard({ linkHref, children }: CategoryCardProps) {
  return (
    <Link
      to={linkHref}
      className={cn(
        "block h-full w-full rounded border px-4 py-2",
        "hover:bg-secondary hover:text-secondary-foreground",
      )}
    >
      {children}
    </Link>
  );
}
