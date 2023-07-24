import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql";
import { MemberTypeId } from "../../member-types/schemas.js";
import { memberTypeByProfileResolver } from "../resolvers/memberType.js";
import { profileResolver, profilesResolver } from "../resolvers/profile.js";
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