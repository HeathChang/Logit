/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GithubContributions($login: String!, $from: DateTime!, $to: DateTime!) {\n  user(login: $login) {\n    contributionsCollection(from: $from, to: $to) {\n      contributionCalendar {\n        totalContributions\n        weeks {\n          contributionDays {\n            date\n            contributionCount\n          }\n        }\n      }\n    }\n  }\n}": typeof types.GithubContributionsDocument,
    "query GithubUser($login: String!) {\n  user(login: $login) {\n    login\n    name\n    avatarUrl\n    url\n    bio\n    company\n    location\n    repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {\n      totalCount\n    }\n    followers {\n      totalCount\n    }\n    following {\n      totalCount\n    }\n  }\n}": typeof types.GithubUserDocument,
};
const documents: Documents = {
    "query GithubContributions($login: String!, $from: DateTime!, $to: DateTime!) {\n  user(login: $login) {\n    contributionsCollection(from: $from, to: $to) {\n      contributionCalendar {\n        totalContributions\n        weeks {\n          contributionDays {\n            date\n            contributionCount\n          }\n        }\n      }\n    }\n  }\n}": types.GithubContributionsDocument,
    "query GithubUser($login: String!) {\n  user(login: $login) {\n    login\n    name\n    avatarUrl\n    url\n    bio\n    company\n    location\n    repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {\n      totalCount\n    }\n    followers {\n      totalCount\n    }\n    following {\n      totalCount\n    }\n  }\n}": types.GithubUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GithubContributions($login: String!, $from: DateTime!, $to: DateTime!) {\n  user(login: $login) {\n    contributionsCollection(from: $from, to: $to) {\n      contributionCalendar {\n        totalContributions\n        weeks {\n          contributionDays {\n            date\n            contributionCount\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GithubContributions($login: String!, $from: DateTime!, $to: DateTime!) {\n  user(login: $login) {\n    contributionsCollection(from: $from, to: $to) {\n      contributionCalendar {\n        totalContributions\n        weeks {\n          contributionDays {\n            date\n            contributionCount\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GithubUser($login: String!) {\n  user(login: $login) {\n    login\n    name\n    avatarUrl\n    url\n    bio\n    company\n    location\n    repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {\n      totalCount\n    }\n    followers {\n      totalCount\n    }\n    following {\n      totalCount\n    }\n  }\n}"): (typeof documents)["query GithubUser($login: String!) {\n  user(login: $login) {\n    login\n    name\n    avatarUrl\n    url\n    bio\n    company\n    location\n    repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {\n      totalCount\n    }\n    followers {\n      totalCount\n    }\n    following {\n      totalCount\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;