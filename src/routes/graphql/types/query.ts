import { GraphQLObjectType } from "graphql";
import { memberType, memberTypes } from "./memberType.js";
import { post, posts } from "./post.js";
import { profile, profiles } from "./profile.js";
import { user, users } from "./user.js";

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user,
    users,
    profile,
    profiles,
    memberType,
    memberTypes,
    post,
    posts,
  },
});