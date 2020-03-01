const { ApolloServer, gql } = require('apollo-server-express');
import { lights, on, off, set, state } from './HueBridge';
import { init, setDriveMode } from './Car';

export const typeDefs = gql`
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
    greeting(name: String): String!
    lights: [Light!]!
    camera: String,
  }
  type Mutation {
    setLight(name: String!, on: Boolean, bri: Int): Boolean!
    setDriveMode(driveMode: DriveMode!, v: Float): State
  }
`;

export const resolvers = {
  Query: {
    greeting(parent, args, context) {
      return `Hello, ${args.name || 'world'}!`;
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

export const apiServer = new ApolloServer({ typeDefs, resolvers });


