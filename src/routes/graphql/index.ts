import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, mainSchema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const validErrors = validate(mainSchema, parse(req.body.query), [depthLimit(5)]);
      if (validErrors)
        return { errors: validErrors };

      const res = await graphql({
        source: req.body.query,
        variableValues: req.body.variables,
        schema: mainSchema,
        contextValue: fastify,
      });
      return res;
    },
  });
};

export default plugin;
