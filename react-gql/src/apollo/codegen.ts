import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4444/graphql",
  documents: ["**/*.{ts,tsx}"],
  generates: {
    "./src/apollo/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
