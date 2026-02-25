import containerQueriesPlugin from "@tailwindcss/container-queries";
import typographyPlugin from "@tailwindcss/typography";
import animatePlugin from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: [
    "./src/**/*.{ts,tsx}",
    "../../common/**/*.{ts,tsx}",
    "../../packages/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    // containers: { // container-query
    //   xs: "20rem",
    //   sm: "24rem",
    //   md: "28rem",
    //   lg: "32rem",
    //   xl: "36rem",
    //   "2xl": "42rem",
    //   "3xl": "48rem",
    //   "4xl": "56rem",
    //   "5xl": "64rem",
    //   "6xl": "72rem",
    //   "7xl": "80rem",
    // },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        xs: "360px",
      },
      width: {
        "full-1": "calc(100% - 1rem)",
        "screen-1": "calc(100vw - 1rem)",
      },
      height: {
        "full-1": "calc(100% - 1rem)",
        "screen-1": "calc(100vh - 1rem)",
      },
      maxHeight: {
        "full-1": "calc(100% - 1rem)",
        "screen-1": "calc(100vh - 1rem)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          paper: "hsl(var(--background) / 0.9)",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          accent1: "#0B0834",
          accent2: "#00E5E5",
          accent3: "#0F9494",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        link: "hsl(var(--link))",
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          border: "hsl(var(--success-border))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
          border: "hsl(var(--info-border))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
          border: "hsl(var(--error-border))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          border: "hsl(var(--warning-border))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "liquid-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "liquid-gradient": "liquid-gradient 60s ease infinite",
      },
    },
  },
  plugins: [
    animatePlugin,
    containerQueriesPlugin,
    typographyPlugin,
    customPlugin(),
  ],
};

function customPlugin() {
  return plugin(({ addComponents, addUtilities, theme }) => {
    addComponents({
      ".paper": {
        color: theme("colors.foreground"),
        backgroundColor: theme("colors.background.paper"),
        borderRadius: theme("borderRadius.sm"),
        boxShadow: theme("boxShadow.lg"),
        padding: theme("padding.2"),
        borderWidth: theme("borderWidth.DEFAULT"),
        borderStyle: theme("borderStyle.solid"),
        borderColor: theme("colors.border"),
        backdropFilter: "blur(5px)",
      },
      ".paper-0": {
        "@apply paper": "",
        padding: theme("padding.0"),
      },
      ".paper-4": {
        "@apply paper": "",
        padding: theme("padding.4"),
      },
      ".popover": {
        color: theme("colors.popover.foreground"),
        backgroundColor: theme("colors.popover.DEFAULT"),
        borderRadius: theme("borderRadius.md"),
        boxShadow: theme("boxShadow.lg"),
        borderWidth: theme("borderWidth.DEFAULT"),
        borderStyle: theme("borderStyle.solid"),
        borderColor: theme("colors.border"),
        overflow: "hidden",
      },
      ".liquid-gradient": {
        backgroundImage: `linear-gradient(-45deg, #ee775280, #e73c7e80, #23a6d580, #23d5ab80)`,
        backgroundSize: "400% 400% !important",
        "@apply animate-liquid-gradient": "",
      },
    });
    addUtilities({
      ".print": {
        "@apply print:rounded-none": "",
        "@apply print:border-none": "",
        "@apply print:shadow-none": "",
        "@apply print:overflow-y-auto": "",
        "@apply print:h-auto": "",
        "@apply print:p-0": "",
        "@apply print:m-0": "",
      },
      ".flex-col-1": {
        display: "flex",
        flexDirection: "column",
        gap: theme("gap.1"),
      },
      ".flex-row-1": {
        display: "flex",
        flexDirection: "row",
        gap: theme("gap.1"),
      },
      ".flex-col-2": {
        display: "flex",
        flexDirection: "column",
        gap: theme("gap.2"),
      },
      ".flex-row-2": {
        display: "flex",
        flexDirection: "row",
        gap: theme("gap.2"),
      },
      ".flex-col-4": {
        display: "flex",
        flexDirection: "column",
        gap: theme("gap.4"),
      },
      ".flex-col-8": {
        display: "flex",
        flexDirection: "column",
        gap: theme("gap.8"),
      },
      ".flex-row-4": {
        display: "flex",
        flexDirection: "row",
        gap: theme("gap.4"),
      },
      ".flex-row-8": {
        display: "flex",
        flexDirection: "row",
        gap: theme("gap.8"),
      },
      ".flex-center": {
        alignItems: "center",
        justifyContent: "center",
      },
      ".flex-middle-start": {
        alignItems: "center",
        justifyContent: "flex-start",
      },
      ".flex-middle-end": {
        alignItems: "center",
        justifyContent: "flex-end",
      },
      ".flex-middle-between": {
        alignItems: "center",
        justifyContent: "space-between",
      },
    });
  });
}
