import { GraphQLResolveInfo } from "graphql";
import { extractSelection } from "../utils/extractSelection";
import { db } from "../../db";
import { User } from "../../entity/user.entity";

interface GetUsersArgs {
  info: GraphQLResolveInfo;
}

interface GetUserArgs extends GetUsersArgs {
  id: number;
}

interface UserInput {
  email: string;
  username?: string;
}

export const getUsers = async ({ info }: GetUsersArgs) => {
  return await db.getRepository(User).find();
};

export const getUser = async ({ id, info }: GetUserArgs) => {
  return await db.getRepository(User).findOneBy({id});
};

export const createUser = async ({ email, username }: UserInput) => {
  const user = db.getRepository(User).create({email, username});
  const createdUser = await db.getRepository(User).save(user)
  return createdUser;
};