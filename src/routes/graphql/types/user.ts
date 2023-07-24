import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { postsByUserResolver } from "../resolvers/post.js";
import { profileByUserResolver } from "../resolvers/profile.js";
import { changeUserResolver, createUserResolver, deleteUserResolver, subscribedToUserResolver, subscribeResolver, unsubscribeResolver, userResolver, usersResolver, userSubscribedToResolver } from "../resolvers/user.js";
import { PostInterface, postType } from "./post.js";
import { ProfileInterface, profileType } from "./profile.js";
import { UUIDType } from "./uuid.js";

export interface UserInterface {
  id: string,
  name: string,
  balance: number,
  profile: ProfileInterface,
  posts: PostInterface[],
  subscribedToUser: UserInterface[],
  userSubscribedTo: UserInterface[],
}

export interface CreateUserInterface {
  dto: {
    name: string,
    balance: number
  }
}

export interface ChangeUserInterface {
  id: string,
  dto: {
    name: string,
    balance: number
  }
}

export interface subInterface {
  userId: string,
  authorId: string,
}


export const userType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType, },
    name: { type: GraphQLString, },
    balance: { type: GraphQLFloat, },
    profile: {
      type: profileType,
      resolve: profileByUserResolver,
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: postsByUserResolver,
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: subscribedToUserResolver,
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: userSubscribedToResolver,
    }
  }),
})

export const createUserType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
})

export const changeUserType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
})

export const user = {
  type: userType,
  args: {
    id: { type: UUIDType },
  },
  resolve: userResolver,
}

export const users = {
  type: new GraphQLList(userType),
  resolve: usersResolver,
}

export const createUser = {
  type: userType,
  args: {
    dto: {
      type: createUserType,
    },
  },
  resolve: createUserResolver,
}

export const deleteUser = {
  type: GraphQLBoolean,
  args: {
    id: { type: UUIDType },
  },
  resolve: deleteUserResolver,
}

export const changeUser = {
  type: userType,
  args: {
    id: { type: UUIDType },
    dto: {
      type: changeUserType,
    },
  },
  resolve: changeUserResolver,
}

export const subscribeTo = {
  type: userType,
  args: {
    userId: { type: UUIDType },
    authorId: { type: UUIDType },
  },
  resolve: subscribeResolver,
}

export const unsubscribeFrom = {
  type: GraphQLString,
  args: {
    userId: { type: UUIDType },
    authorId: { type: UUIDType },
  },
  resolve: unsubscribeResolver,
}