const { router, get, post, options } = require('microrouter');
const cors = require('micro-cors')();
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
    set(name: String!, bri: Int): Boolean!
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
    async set(parent, { name, bri }, context) {
      set(name, state().bri(bri));
      return true;
    },
    async alert(parent, { name }, context) {
      return await alert(name);
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const graphqlHandler = cors(apolloServer.createHandler());

// const handler = (req, res) => {
//   if (req.method === 'OPTIONS') {
//     return send(res, 200, 'ok!');
//   }

//   if (req.method !== 'POST') {
//     throw createError(404, 'Not Found');
//   }

//   // handle incoming request as usual
// }

module.exports = cors(router(
  get('/*', (req, res) => handler(req, res, { public: '../public' })),
  post('/graphql', graphqlHandler),
));
