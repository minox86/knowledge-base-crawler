export default {
  extends: ["../../../.eslintrc.js"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    // API-specific rules can be added here
    "@typescript-eslint/no-explicit-any": "warn", // Allow any for API responses during development
  },
};
