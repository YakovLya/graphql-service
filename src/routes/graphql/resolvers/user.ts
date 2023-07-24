import { FastifyInstance } from "fastify";
import { PostInterface } from "../types/post.js";
import { ProfileInterface } from "../types/profile.js";
import { ChangeUserInterface, CreateUserInterface, UserInterface } from "../types/user.js";

export const userResolver = async (_parent, args: { id: string }, fastify: FastifyInstance) => {
  const result = await fastify.prisma.user.findUnique({
    where: {
      id: args.id,
    },
  });
  return result;
};

export const usersResolver = async (_parent, _args, fastify: FastifyInstance) => {
  const result = await fastify.prisma.user.findMany();
  return result;
};

export const subscribedToUserResolver = async (parent: UserInterface, _args, fastify: FastifyInstance) => {
  const result = await fastify.prisma.user.findMany({
    where: {
      userSubscribedTo: {
        some: {
          authorId: parent.id,
        },
      },
    },
  });
  return result;
};

export const userSubscribedToResolver = async (parent: UserInterface, _args, fastify: FastifyInstance) => {
  const result = await fastify.prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: parent.id,
        },
      },
    },
  });
  return result;
};

export const userByProfileResolver = async (parent: ProfileInterface, _args, fastify: FastifyInstance) => {
  const result = await fastify.prisma.user.findUnique({
    where: {
      id: parent.userId,
    },
  });
  return result;
};

export const userByPostResolver = async (parent: PostInterface, _args, fastify: FastifyInstance) => {
  const result = await fastify.prisma.user.findUnique({
    where: {
      id: parent.authorId,
    },
  });
  return result;
};


export const createUserResolver = async (_parent, args: CreateUserInterface, fastify: FastifyInstance) => {
  const result = await fastify.prisma.user.create({
    data: args.dto,
  });
  return result;
}

export const deleteUserResolver = async (_parent, args: { id: string} , fastify: FastifyInstance) => {
  const result = await fastify.prisma.user.delete({
    where: {
      id: args.id,
    },
  });
}

export const changeUserResolver = async (_parent, args: ChangeUserInterface, fastify: FastifyInstance) => {
  const result = await fastify.prisma.user.update({
    where: {
      id: args.id,
    },
    data: args.dto,
  });
  return result;
}

