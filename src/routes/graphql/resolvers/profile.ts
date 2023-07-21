import { FastifyInstance } from "fastify";
import { MemberTypeInterface } from "../types/memberType.js";
import { UserInterface } from "../types/user.js";

export const profileResolver = async (_parent, args: { id: string }, fastify: FastifyInstance) => {
  const result = await fastify.prisma.profile.findUnique({
    where: {
      id: args.id,
    },
  });
  return result;
};

export const profilesResolver = async (_parent, _args, fastify: FastifyInstance) => {
  const result = await fastify.prisma.profile.findMany();
  return result;
};

export const profileByMemberTypeResolver = async (parent: MemberTypeInterface, _args, fastify: FastifyInstance) => {
  const result = await fastify.prisma.profile.findMany({
    where: {
      userId: parent.id,
    },
  });
  return result;
};

export const profileByUserResolver = async (parent: UserInterface, _args, fastify: FastifyInstance) => {
  const result = await fastify.prisma.profile.findUnique({
    where: {
      userId: parent.id,
    },
  });
  return result;
};