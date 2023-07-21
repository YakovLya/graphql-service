import { FastifyInstance } from "fastify";
import { ProfileInterface } from "../types/profile.js";

export const memberTypeResolver = async (_parent, args: { id: string }, fastify: FastifyInstance) => {
  const result = await fastify.prisma.memberType.findUnique({
    where: {
      id: args.id,
    },
  });
  return result;
};

export const memberTypesResolver = async (_parent, _args, fastify: FastifyInstance) => {
  const result = await fastify.prisma.memberType.findMany();
  return result;
};

export const memberTypeByProfileResolver = async (parent: ProfileInterface, _args, fastify: FastifyInstance) => {
  const result = await fastify.prisma.memberType.findUnique({
    where: {
      id: parent.memberTypeId,
    },
  });
  return result;
};