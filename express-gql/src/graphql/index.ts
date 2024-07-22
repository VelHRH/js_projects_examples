import fs from "fs";
import path from "path";
import { userResolver } from "./resolvers/userResolver";

const userTypes = fs.readFileSync(
  path.join(__dirname, "typedefs", "user.gql"),
  "utf-8"
);

const postTypes = fs.readFileSync(
  path.join(__dirname, "typedefs", "post.gql"),
  "utf-8"
);

export const typeDefs = `${userTypes} ${postTypes}`;

export const resolvers = {
  Query: {
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};
