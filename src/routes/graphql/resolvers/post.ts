import { FastifyInstance } from "fastify";
import { UserInterface } from "../types/user.js";

export const postResolver = async (_parent, args: { id: string }, fastify: FastifyInstance) => {
  const result = await fastify.prisma.post.findUnique({
    where: {
      id: args.id,
    },
  });
  return result;
};

export const postsResolver = async (_parent, _args, fastify: FastifyInstance) => {
  const result = await fastify.prisma.post.findMany();
  return result;
};

export const postsByUserResolver = async (parent: UserInterface, _args, fastify: FastifyInstance) => {
  const result = await fastify.prisma.post.findMany({
    where: {
      authorId: parent.id,
    },
  });
  return result;
};