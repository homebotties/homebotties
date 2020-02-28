const { router, get, post, options } = require('microrouter');
const cors = require('micro-cors')();
const serveHandler = require('serve-handler');
const { ApolloServer, gql } = require('apollo-server-micro');
import { lights, on, off, set, alert, state } from './lights';

const schema = gql`
  type Light {
    id: String!
    name: String!
  }
  type Query {
    hello: String!,
    lights: [Light!]!
    camera: String,
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
    hello(parent, args, context) {
	    return 'world';
    },
    lights(parent, args, context) {
      return lights;
    },
    camera(parent, args, context) {
      return 'http://scobot:8080/stream/video.mjpeg'
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

const graphqlServer = new ApolloServer({ typeDefs: schema, resolvers });
const graphqlHandler = cors(graphqlServer.createHandler());

module.exports = cors(router(
  get('/*', (req, res) => serveHandler(req, res, { public: './public' })),
  post('/graphql', graphqlHandler),
  // TODO camera stream
));
