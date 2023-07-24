import { GraphQLObjectType } from "graphql";
import { changePost, createPost, deletePost } from "./post.js";
import { changeProfile, createProfile, deleteProfile } from "./profile.js";
import { changeUser, createUser, deleteUser } from "./user.js";


export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser,
    deleteUser,
    changeUser,
    createPost,
    deletePost,
    changePost,
    createProfile,
    deleteProfile,
    changeProfile,
  },
});