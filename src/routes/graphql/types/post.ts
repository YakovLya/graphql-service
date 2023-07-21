import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { postResolver, postsResolver } from "../resolvers/post.js";
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

export const postType: GraphQLObjectType = new GraphQLObjectType({
  name: 'post',
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