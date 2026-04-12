import nextConfig from "eslint-config-next"
import prettierConfig from "eslint-config-prettier"

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
]

export default config
