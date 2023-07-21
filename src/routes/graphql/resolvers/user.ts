import { FastifyInstance } from "fastify";
import { ProfileInterface } from "../types/profile.js";
import { UserInterface } from "../types/user.js";

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
      id: parent.id,
    },
  });
  return result;
};
