import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      filter: {
        invert: "invert(1)",
      },
      colors: {
        ghostwhite: {
          "100": "#f6f5fa",
          "200": "#ebe9f0",
        },
        white: "#fff",
        gray: {
          "500": "#898889",
          "600": "#212133",
          "700": "#0d0f23",
          "800": "#030203",
          "100": "rgba(255, 255, 255, 0.5)",
          "200": "rgba(255, 255, 255, 0.75)",
          "300": "rgba(0, 0, 0, 0.5)",
        },
        honeydew: {
          "100": "#e0ffdf",
          "200": "#e1f1e0",
        },
        gainsboro: "#e9e7ec",
        slategray: {
          "100": "#7a7c8e",
          "200": "#767688",
        },
        black: "#000",
        lightslategray: {
          "100": "#8f98b7",
          "200": "#79819e",
        },
        goldenrod: {
          "100": "#e7a822",
          "200": "#e7a722",
          "300": "#d29b26",
        },
        darkslategray: {
          "300": "#404257",
          "400": "#36385a",
        },
        darkgoldenrod: {
          "100": "#b68318",
          "200": "#b57500",
        },
        lightsteelblue: "#9fa8c7",
        thistle: "#e5d5fd",
        mediumslateblue: {
          "100": "#925fe2",
          "200": "rgba(146, 95, 226, 0.3)",
        },

        mediumpurple: "rgba(156, 111, 228, 0.3)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
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
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "base-6": "15.6px",
        "base-3": "16.3px",
        "xl-8": "20.8px",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        poppins: "Poppins",
      },
      fontSize: {
        "2xs-4": "10.4px",
        smi: "13px",
        "xs-7": "11.7px",
        inherit: "inherit",
        base: "16px",
        sm: "14px",
        "5xl": "24px",
        lgi: "19px",
        xs: "12px",
        "13xl": "32px",
        "7xl": "26px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        mq725: {
          raw: "screen and (max-width: 725px)",
        },
        mq650: {
          raw: "screen and (max-width: 650px)",
        },
        mq450: {
          raw: "screen and (max-width: 450px)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
