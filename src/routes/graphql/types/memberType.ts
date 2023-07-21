import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { memberTypeResolver, memberTypesResolver } from "../resolvers/memberType.js";
import { profileByMemberTypeResolver } from "../resolvers/profile.js";
import { ProfileInterface, profileType } from "./profile.js";

export interface MemberTypeInterface {
  id: string,
  discount: number,
  postsLimitPerMonth: number,
  profiles: ProfileInterface
}

export const memberTypeType = new GraphQLObjectType({
  name: 'memberType',
  fields: {
    id: { type: GraphQLString },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    //profiles: {
    //  type: new GraphQLList(profileType),
    //  resolve: profileByMemberTypeResolver,
    //}
  }
})

export const memberType = {
  type: memberTypeType,
  args: {
    id: {
      type: GraphQLString,
    },
  },
  resolve: memberTypeResolver,
}

export const memberTypes = {
  type: new GraphQLList(memberTypeType),
  resolve: memberTypesResolver,
}