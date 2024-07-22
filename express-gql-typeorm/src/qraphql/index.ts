import fs from "fs";
import path from "path";
import { userResolver } from "./resolvers/userResolver";

const userTypes = fs.readFileSync(
  path.join(__dirname, "typedefs", "user.gql"),
  "utf-8"
);

export const typeDefs = `${userTypes}`;

export const resolvers = {
  Query: {
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};