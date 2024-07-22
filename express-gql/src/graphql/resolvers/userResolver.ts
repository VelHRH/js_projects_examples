import { GraphQLResolveInfo } from "graphql";
import { getUser, getUsers } from "../services/userService";

export const userResolver = {
  Query: {
    async users(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      return getUsers({ info });
    },
    async user(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      return getUser({ id: args.id, info });
    },
  },
  Mutation: {
    async createUser() {},
  },
};
