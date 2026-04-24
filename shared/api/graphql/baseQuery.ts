import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { ClientError, GraphQLClient } from "graphql-request";
import type { DocumentNode } from "graphql";

const GRAPHQL_ENDPOINT = "/api/graphql";

export type GraphqlBaseQueryArgs = {
  document: DocumentNode;
  variables?: Record<string, unknown>;
};

export type GraphqlBaseQueryError = {
  status: number | "NETWORK_ERROR";
  message: string;
};

const client = new GraphQLClient(GRAPHQL_ENDPOINT);

export const graphqlBaseQuery: BaseQueryFn<
  GraphqlBaseQueryArgs,
  unknown,
  GraphqlBaseQueryError
> = async ({ document, variables }) => {
  try {
    const data = await client.request(document, variables);
    return { data };
  } catch (error) {
    if (error instanceof ClientError) {
      return {
        error: {
          status: error.response.status,
          message: error.message,
        },
      };
    }
    return {
      error: {
        status: "NETWORK_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
};
