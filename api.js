const { ApolloServer, gql } = require('apollo-server-express');
import { lights, on, off, set, state } from './hue';
import { init, setDriveMode } from './car';
import { status, logs, createLog } from './bot';

export const typeDefs = gql`
  type Light {
    id: String!
    name: String!
  }
  type Log {
    text: String
  }
  type Bot {
    status: String!
    logs: [Log!]!
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
    bot: Bot!
  }
  type Mutation {
    setLight(name: String!, on: Boolean, bri: Int): Boolean!
    setDriveMode(driveMode: DriveMode!, v: Float): DriveMode
    createLog(text: String): Log
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
      return bot;
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
    async createLog(parent, args, context) {
      return bot.createLog(args)
    }
  },
};

export const apiServer = new ApolloServer({ typeDefs, resolvers });


