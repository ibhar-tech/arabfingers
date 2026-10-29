import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-config-next 16 ships native flat configs, so FlatCompat is gone.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // New in eslint-plugin-react-hooks 7 (arrived with eslint-config-next 16).
    // They flag 29 long-standing patterns in the games, colouring canvas and
    // science players, which work today; refactoring them is its own change,
    // not part of the framework upgrade. Warn until that is done.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/purity": "warn",
    },
  },
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Cloudflare adapter build output. Generated, gitignored, and the source of
    // every one of the 727 "errors" that used to drown out real findings.
    ".open-next/**",
    ".wrangler/**",
    // Node CLI helpers (voiceover + worksheet generation) — not app code
    "scripts/**",
  ]),
]);

export default eslintConfig;
