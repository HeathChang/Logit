import type { CodegenConfig } from "@graphql-codegen/cli";

const githubToken = process.env.GITHUB_TOKEN;

if (!githubToken) {
  throw new Error(
    "codegen 실행에는 GITHUB_TOKEN 환경 변수가 필요합니다. .env.local 을 확인하세요.",
  );
}

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://api.github.com/graphql": {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          "User-Agent": "logit-codegen",
        },
      },
    },
  ],
  documents: ["shared/api/graphql/operations/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "shared/api/graphql/__generated__/": {
      preset: "client",
      config: {
        useTypeImports: true,
        avoidOptionals: false,
        scalars: {
          URI: "string",
          DateTime: "string",
          GitTimestamp: "string",
          Date: "string",
          HTML: "string",
          GitObjectID: "string",
          GitSSHRemote: "string",
          PreciseDateTime: "string",
          X509Certificate: "string",
          BigInt: "string",
        },
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
