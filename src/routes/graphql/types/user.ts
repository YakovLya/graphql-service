import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { postsByUserResolver } from "../resolvers/post.js";
import { profileByUserResolver } from "../resolvers/profile.js";
import { subscribedToUserResolver, userResolver, usersResolver, userSubscribedToResolver } from "../resolvers/user.js";
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

export const userType: GraphQLObjectType = new GraphQLObjectType({
  name: 'user',
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

export const user = {
  type: userType,
  args: {
    id: {
      type: UUIDType,
    },
  },
  resolve: userResolver,
}

export const users = {
  type: new GraphQLList(userType),
  resolve: usersResolver,
}
