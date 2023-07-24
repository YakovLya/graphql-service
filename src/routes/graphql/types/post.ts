import { GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { changePostResolver, createPostResolver, deletePostResolver, postResolver, postsResolver } from "../resolvers/post.js";
import { userByPostResolver } from "../resolvers/user.js";
import { UserInterface, userType } from "./user.js";
import { UUIDType } from "./uuid.js";

export interface PostInterface {
  id: string,
  title: string,
  content: string,
  authorId: string,
  author: UserInterface,
}

export interface CreatePostInterface {
  dto: {
    authorId: string,
    content: string,
    title: string,
  }
}

export interface ChangePostInterface {
  id: string,
  dto: {
    authorId: string,
    content: string,
    title: string,
  }
}

export const postType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType, },
    title: { type: GraphQLString, },
    content: { type: GraphQLString, },
    authorId: { type: UUIDType, },
    author: {
      type: userType,
      resolve: userByPostResolver,
    },
  }),
})

export const createPostType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    authorId: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  }),
})

export const changePostType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    authorId: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
})

export const post = {
  type: postType,
  args: {
    id: {
      type: UUIDType,
    },
  },
  resolve: postResolver,
}

export const posts = {
  type: new GraphQLList(postType),
  resolve: postsResolver,
}

export const createPost = {
  type: postType,
  args: {
    dto: {
      type: createPostType,
    },
  },
  resolve: createPostResolver,
}

export const deletePost = {
  type: GraphQLBoolean,
  args: {
    id: { type: UUIDType },
  },
  resolve: deletePostResolver,
}

export const changePost = {
  type: postType,
  args: {
    id: { type: UUIDType },
    dto: {
      type: changePostType,
    },
  },
  resolve: changePostResolver,
}