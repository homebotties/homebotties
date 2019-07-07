const { router, get, post, options } = require('microrouter');
const handler = require('serve-handler');
const { ApolloServer, gql } = require('apollo-server-micro');
import { lights, on, off, set, alert, state } from './lights';

const typeDefs = gql`
  type Light {
    id: String!
    name: String!
  }
  type Query {
    lights: [Light!]!
  }
  type Mutation {
    on(name: String!): Boolean!
    off(name: String!): Boolean!
    set(name: String!): Light!
    alert(name: String!): Boolean!
  }
`;

const resolvers = {
  Query: {
    lights(parent, args, context) {
      return lights;
    },
  },
  Mutation: {
    async on(parent, { name }, context) {
      return await on(name);
    },
    async off(parent, { name }, context) {
      return await off(name);
    },
    set(parent, { name }, context) {
      set(name, state().bri(240).hue(1000));
      return lights[0]; // TODO
    },
    async alert(parent, { name }, context) {
      return await alert(name);
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const graphqlHandler = apolloServer.createHandler();

module.exports = router(
  get('/*', (req, res) => handler(req, res)),
  post('/graphql', graphqlHandler),
);
