import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    ignores: [".github/", ".husky/", "node_modules/", ".next/", "src/components/ui", "*.config.ts", "*.mjs"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      import: pluginImport,
      prettier: prettier,
      react: pluginReact,
    },
    rules: {
      // Prettier formatting integration
      "prettier/prettier": "warn",

      "import/no-unresolved": ["error", { caseSensitive: true }],

      // TypeScript: allow underscore args, flag unused
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

      // React cleanup
      "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],

      // Mild preferences (can adjust later)
      "no-duplicate-imports": "error",
    },
  },
  // Recommended base configs
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
