const flattenColorPalette =
  require("tailwindcss/lib/util/flattenColorPalette").default
const safeListFile = "safelist.txt"
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./safelist.txt",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        "ui-serif",
        "Georgia",
        "Cambria",
        '"Times New Roman"',
        "Times",
        "serif",
      ],
      nunito: ["Nunito Sans", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
    },
    screens: {
      xs: "576",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        main: {
          100: "#2E3133",
          200: "#DCF0FA",
          400: "#DEFAF8",
          500: "#E87433",
          600: "#037DC3",
          700: "#FEF9C3",
          800: "#DCFCE7",
          900: "#FEE2E2",
        },
        blue: {
          200: "#BFDBFE",
          300: "#DBEAFE",
          400: "#60A5FA",
          600: "#3B82F6",
          500: "#037DC3",
          999: "#2C2B6B",
        },
        amber: {
          200: "#FDE68A",
          400: "#EAB308",
          500: "#F59E0B",
          600: "#D97706",
          700: "#FB923C",
        },
        red: {
          400: "#F87171",
          600: "#DC2626",
          800: "#991B1B",
        },
        rose: {
          500: "#F43F5E",
        },
        slate: {
          50: "#F5F7FA",
          100: "#EFF3F7",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#6E8099",
          600: "#334155",
          800: "#4B5563",
          700: "#64748B",
        },
        emerald: {
          200: "#A7F3D0",
          300: "#D1FAE5",
          600: "#059669",
          700: "#013042",
        },
        green: {
          200: "#10B981",
          400: "#4ADE80",
          600: "#16A34A",
          700: "#0B5D4E",
        },
        grey: {
          50: "#EAEAE9",
          100: "#6E8099",
          200: "#4B4B4B",
          300: "#D1D5DB",
          400: "#F5F5F4",
          500: "#6e7f99",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.500"),
            maxWidth: "65ch",
          },
        },
        invert: {
          css: {
            color: theme("colors.gray.400"),
          },
        },
      }),
    },
  },
  plugins: [
    ({ addUtilities, e, theme, variants }) => {
      const colors = flattenColorPalette(theme("borderColor"))
      delete colors["default"]

      const colorMap = Object.keys(colors).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] },
      }))
      const utilities = Object.assign({}, ...colorMap)

      addUtilities(utilities, variants("borderColor"))
    },
    // If your application does not require multiple theme selection,
    // you can replace {color} to your theme color value
    // this can drastically reduces the size of the output css file
    // e.g 'text-{colors}' --> 'text-emerald'
    require("tailwind-safelist-generator")({
      path: safeListFile,
      patterns: [
        "text-{colors}",
        "bg-{colors}",
        "dark:bg-{colors}",
        "dark:hover:bg-{colors}",
        "dark:active:bg-{colors}",
        "hover:text-{colors}",
        "hover:bg-{colors}",
        "active:bg-{colors}",
        "ring-{colors}",
        "hover:ring-{colors}",
        "focus:ring-{colors}",
        "focus-within:ring-{colors}",
        "border-{colors}",
        "focus:border-{colors}",
        "focus-within:border-{colors}",
        "dark:text-{colors}",
        "dark:hover:text-{colors}",
        "h-{height}",
        "w-{width}",
      ],
    }),
    require("@tailwindcss/typography"),
  ],
}
