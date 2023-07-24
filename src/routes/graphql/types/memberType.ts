import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { MemberTypeId } from "../../member-types/schemas.js";
import { memberTypeResolver, memberTypesResolver } from "../resolvers/memberType.js";
import { profileByMemberTypeResolver } from "../resolvers/profile.js";
import { memberTypeIdType } from "./memberTypeId.js";
import { ProfileInterface, profileType } from "./profile.js";

export interface MemberTypeInterface {
  id: string,
  discount: number,
  postsLimitPerMonth: number,
  profiles: ProfileInterface
}

export const memberTypeType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: memberTypeIdType },
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
      type: memberTypeIdType,
    },
  },
  resolve: memberTypeResolver,
}

export const memberTypes = {
  type: new GraphQLList(memberTypeType),
  resolve: memberTypesResolver,
}