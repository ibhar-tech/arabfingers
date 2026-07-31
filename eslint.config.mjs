import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
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
    ],
  },
];

export default eslintConfig;
