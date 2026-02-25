import { useEffect, useState } from "react";

export type BlurhashFileInputProps = {
  name: string;
  file: File | null;
  x?: number;
  y?: number;
};

export function BlurhashFileInput({
  name,
  file,
  x,
  y,
}: BlurhashFileInputProps) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    transformFileToBlurhash(file, x, y)
      .then((hash) => setValue(hash ?? ""))
      .catch();
  }, [file, x, y]);

  return <input type="hidden" name={name} value={value} />;
}

async function transformFileToBlurhash(
  file: File | undefined | null,
  x = 4,
  y = 3,
): Promise<string | undefined> {
  if (!file) return;
  const image = await fileToImage(file);
  const imageData = getImageData(image);
  if (!imageData) return;
  const { data, height, width } = imageData;
  const { encode } = await import("blurhash");
  return encode(data, width, height, x, y);
}

function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.addEventListener("load", () => {
      URL.revokeObjectURL(url);
      resolve(img);
    });
    img.src = url;
  });
}

function getImageData(image: HTMLImageElement): ImageData | undefined {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  if (!context) return undefined;

  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
}
