import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql";
import { MemberTypeId } from "../../member-types/schemas.js";
import { memberTypeByProfileResolver } from "../resolvers/memberType.js";
import { changeProfileResolver, createProfileResolver, deleteProfileResolver, profileResolver, profilesResolver } from "../resolvers/profile.js";
import { userByProfileResolver } from "../resolvers/user.js";
import { MemberTypeInterface, memberTypeType } from "./memberType.js";
import { memberTypeIdType } from "./memberTypeId.js";
import { UserInterface, userType } from "./user.js";
import { UUIDType } from "./uuid.js";

export interface ProfileInterface {
  id: string,
  isMale: boolean,
  yearOfBirth: number,
  userId: string,
  user: UserInterface,
  memberTypeId: string,
  memberType: MemberTypeInterface
}

export interface CreateProfileInterface {
  dto: {
    userId: string,
    memberTypeId: string,
    isMale: boolean,
    yearOfBirth: number,
  }
}

export interface ChangeProfileInterface {
  id: string,
  dto: {
    memberTypeId: string,
    isMale: boolean,
    yearOfBirth: number,
  }
}

export const profileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType, },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    user: {
      type: userType,
      resolve: userByProfileResolver,
    },
    memberTypeId: { type: memberTypeIdType },
    memberType: {
      type: memberTypeType,
      resolve: memberTypeByProfileResolver,
    }
  }),
})

export const createProfileType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(memberTypeIdType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
  }),
})

export const changeProfileType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    memberTypeId: { type: memberTypeIdType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  }),
})

export const profile = {
  type: profileType,
  args: {
    id: {
      type: UUIDType,
    },
  },
  resolve: profileResolver,
}

export const profiles = {
  type: new GraphQLList(profileType),
  resolve: profilesResolver,
}

export const createProfile = {
  type: profileType,
  args: {
    dto: {
      type: createProfileType,
    },
  },
  resolve: createProfileResolver,
}

export const deleteProfile = {
  type: GraphQLBoolean,
  args: {
    id: { type: UUIDType },
  },
  resolve: deleteProfileResolver,
}

export const changeProfile = {
  type: profileType,
  args: {
    id: { type: UUIDType },
    dto: {
      type: changeProfileType,
    },
  },
  resolve: changeProfileResolver,
}