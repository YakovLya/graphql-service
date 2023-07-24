import { GraphQLObjectType } from "graphql";
import { changePost, createPost, deletePost } from "./post.js";
import { changeProfile, createProfile, deleteProfile } from "./profile.js";
import { changeUser, createUser, deleteUser, subscribeTo, unsubscribeFrom } from "./user.js";


export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser,
    deleteUser,
    changeUser,
    subscribeTo,
    unsubscribeFrom,
    createPost,
    deletePost,
    changePost,
    createProfile,
    deleteProfile,
    changeProfile,
  },
});