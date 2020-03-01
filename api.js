const { ApolloServer, gql } = require('apollo-server-express');
import { lights, on, off, set, state } from './hue';
import { init, setDriveMode } from './car';

export const typeDefs = gql`
  type Light {
    id: String!
    name: String!
  }
  type State {
    value: String!
  }
  type Bot {
    name: String!
    state: String
  }
  enum DriveMode {
    STOP
    FORWARD 
    BACK
    LEFT
    RIGHT
  }
  type Query {
    greeting(name: String): String!
    lights: [Light!]!
    camera: String,
    bot: Bot!,
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
    bot(parent, args, context) {
      return { name: 'scobot', state: ''};
    }
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


