import { cn } from "@innbell/utils/cn";
import { forwardRef, memo, useCallback } from "react";

export type ImgProps = Omit<
  React.ComponentPropsWithRef<"img">,
  "width" | "height"
> & { width?: number; height?: number; blurhash?: string };

const BlurhashCanvas = memo(
  (props: {
    blurhash: string | undefined;
    width?: number;
    height?: number;
    punch?: number;
  }): React.ReactNode => {
    const { blurhash, height = 150, width = 250, punch } = props;

    const handleRef = useCallback(
      async (canvas: HTMLCanvasElement | null) => {
        const ctx = canvas?.getContext("2d");
        if (!ctx || !blurhash) return;

        const { decode, isBlurhashValid } = await import("blurhash");
        if (!isBlurhashValid(blurhash)) return;

        const pixels = decode(blurhash, width, height, punch);
        ctx.clearRect(0, 0, width, height);
        const imageData = ctx.createImageData(width, height);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
      },
      [blurhash, width, height, punch],
    );

    if (!blurhash) return null;

    return (
      <canvas
        className="absolute inset-0 h-full w-full"
        ref={handleRef}
        key={blurhash}
      />
    );
  },
);

export const Img = forwardRef(function Image(
  { blurhash, className, id, height, width, ...props }: ImgProps,
  ref: React.ForwardedRef<HTMLImageElement>,
): React.ReactNode {
  return (
    <div className={cn("relative w-full h-full", className)} id={id}>
      <BlurhashCanvas blurhash={blurhash} height={height} width={width} />
      <img
        {...props}
        className="w-full h-full object-cover relative z-[1]"
        ref={ref}
      />
    </div>
  );
});
