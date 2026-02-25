export type PublicLogo = {
  src: string;
  alt: string;
};

export const buyerLogos: PublicLogo[] = [
  {
    src: "/logos/Sarovar.jpg",
    alt: "Sarovar Hotels and Resorts",
  },
  {
    src: "/logos/LouvreHotels.png",
    alt: "Louvre Hotels",
  },
  {
    src: "/logos/LemonTree.png",
    alt: "Lemon Tree Hotels",
  },
  {
    src: "/logos/RoyalOrchid.jpg",
    alt: "Royal Orchid Hotels",
  },
  {
    src: "/logos/ResidencyGroup.png",
    alt: "Residency Group",
  },
  {
    src: "/logos/GRT.png",
    alt: "GRT Group",
  },
  {
    src: "/logos/Prestige.png",
    alt: "Prestige Hotels",
  },
  {
    src: "/logos/Juniper.png",
    alt: "Juniper Hotels",
  },
  {
    src: "/logos/RainTree.jpeg",
    alt: "Raintree Hotels",
  },
  {
    src: "/logos/GoldenTulip.png",
    alt: "Golden Tulip Essential",
  },
];

export const vendorLogos: PublicLogo[] = [
  {
    src: "/logos/FuntreeHotels.png",
    alt: "Funtree Hotels and Consultancy",
  },
  {
    src: "/logos/Kalpik.jpg",
    alt: "Kalpik Interiors",
  },
];

export const allLogos: PublicLogo[] = [...buyerLogos, ...vendorLogos].slice(
  0,
  12,
);
