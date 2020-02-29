//const res = require('micro/res')
const fs = require('fs');
const {send} = require('micro')
const { router, get, post, options } = require('microrouter');
const cors = require('micro-cors')();
const serveHandler = require('serve-handler');
const { ApolloServer, gql } = require('apollo-server-micro');
import { lights, on, off, set, alert, state } from './lights';
import { setDriveMode } from './car';

const schema = gql`
  type Light {
    id: String!
    name: String!
  }
  type State {
    value: String!
  }
  enum DriveMode {
    STOP
    GO
    BACK
    LEFT
    RIGHT
  }
  type Query {
    hello: String!,
    lights: [Light!]!
    camera: String,
  }
  type Mutation {
    setLight(name: String!, on: Boolean, bri: Int): Boolean!
    setDriveMode(driveMode: DriveMode!, v: Float): State
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
    async setLight(parent, { name, on, bri }, context) {
      set(name, state().bri(bri));// TODO on-ness
      return true;
    },
    async setDriveMode(parent, { driveMode, v }, context) {
      await setDriveMode(driveMode, v);
      return { value: driveMode };
    },
  },
};

const graphqlServer = new ApolloServer({ typeDefs: schema, resolvers });
const graphqlHandler = cors(graphqlServer.createHandler());

module.exports = cors(router(
  post('/graphql', graphqlHandler),
  get('/', (req, res) => serveHandler(req, res, { public: '.' })),
  //get('/graphiql', (req, res) => serveHandler(req, res, { public: './graphiql.html' })),
 // TODO camera stream
));
