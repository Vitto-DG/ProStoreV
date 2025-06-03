import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  /* ...compat.extends("next/core-web-vitals", "next/typescript"), */
{
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "out/**",
      "build/**",
      "lib/generated/**", // <--- this miserable new-way folder of Prisma Client :-)
    ],
  }, // <-----------------
  {
    files: ["**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
   ...compat.extends("next/core-web-vitals", "next/typescript")
];


export default eslintConfig;
