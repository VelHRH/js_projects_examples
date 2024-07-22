import { GraphQLResolveInfo } from "graphql";
import { extractSelection } from "../utils/extractSelection";
import { prisma } from "../../../prisma";

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
  const extractedSelections = extractSelection(info);
  const postsIncluded = extractedSelections.includes("posts");

  if (postsIncluded) {
    return await prisma.user.findMany({ include: { posts: true } });
  }

  return await prisma.user.findMany();
};

export const getUser = async ({ id, info }: GetUserArgs) => {
  const extractedSelections = extractSelection(info);
  const postsIncluded = extractedSelections.includes("posts");

  if (postsIncluded) {
    return await prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  return await prisma.user.findUnique({ where: { id } });
};

export const createUser = async ({ email, username }: UserInput) => {
  console.log({ email, username });

  const createdUser = await prisma.user.create({
    data: {
      id: Math.floor(Math.random() * 1000),
      email,
      username,
    },
  });

  return createdUser;
};
