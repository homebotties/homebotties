const { ApolloServer, gql } = require('apollo-server-express');
import { status, logs, createLog } from './bot';

export const typeDefs = gql`
  type Log {
    text: String
  }
  type Bot {
    status: String!
    logs: [Log!]!
  }
  type Query {
    bot: Bot!
  }
  type Mutation {
    createLog(text: String): Log
  }
`;

export const resolvers = {
  Query: {
    bot(parent, args, context) {
      return { status };
    },
  },
  Mutation: {
    async createLog(parent, args, context) {
      return bot.createLog(args)
    }
  },
};

export const apiServer = new ApolloServer({ typeDefs, resolvers });


