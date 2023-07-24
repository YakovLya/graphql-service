import { FastifyInstance } from "fastify";
import { ChangePostInterface, CreatePostInterface } from "../types/post.js";
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

export const createPostResolver = async (_parent, args: CreatePostInterface, fastify: FastifyInstance) => {
  const result = await fastify.prisma.post.create({
    data: args.dto,
  });
  return result;
}

export const deletePostResolver = async (_parent, args: { id: string }, fastify: FastifyInstance) => {
  const result = await fastify.prisma.post.delete({
    where: {
      id: args.id,
    },
  });
}

export const changePostResolver = async (_parent, args: ChangePostInterface, fastify: FastifyInstance) => {
  const result = await fastify.prisma.post.update({
    where: {
      id: args.id,
    },
    data: args.dto,
  });
  return result;
}
