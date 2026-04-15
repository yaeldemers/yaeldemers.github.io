import nextConfig from "eslint-config-next"
import prettierConfig from "eslint-config-prettier"
import i18nextPlugin from "eslint-plugin-i18next"

const config = [
  ...nextConfig,
  prettierConfig,
  {
    rules: {
      // React 19 introduced these strict rules, but the patterns they flag
      // (setMounted, localStorage hydration, rAF-driven animation refs) are
      // intentional and well-understood in this codebase.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
    },
  },
  // Guard against hard-coded user-visible strings in components and pages.
  // Any literal text in JSX must come from translations.json via t.*
  // Exceptions require an explicit eslint-disable comment with a reason.
  {
    plugins: { i18next: i18nextPlugin },
    files: ["components/**/*.tsx", "app/**/*.tsx"],
    rules: {
      // Only flag JSX text content (between tags) and user-visible attributes.
      // aria-*, role, src, className, etc. are intentionally excluded.
      "i18next/no-literal-string": [
        "error",
        {
          mode: "jsx-only",
          "jsx-attributes": { include: ["placeholder", "title"] },
        },
      ],
    },
  },
]

export default config
