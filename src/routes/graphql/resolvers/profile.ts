import { FastifyInstance } from "fastify";
import { MemberTypeInterface } from "../types/memberType.js";
import { ChangeProfileInterface, CreateProfileInterface } from "../types/profile.js";
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
      memberTypeId: parent.id,
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

export const createProfileResolver = async (_parent, args: CreateProfileInterface, fastify: FastifyInstance) => {
  const result = await fastify.prisma.profile.create({
    data: args.dto,
  });
  return result;
}

export const deleteProfileResolver = async (_parent, args: { id: string }, fastify: FastifyInstance) => {
  const result = await fastify.prisma.profile.delete({
    where: {
      id: args.id,
    },
  });
}

export const changeProfileResolver = async (_parent, args: ChangeProfileInterface, fastify: FastifyInstance) => {
  const result = await fastify.prisma.profile.update({
    where: {
      id: args.id,
    },
    data: args.dto,
  });
  return result;
}