import { graphql, buildSchema } from "https://cdn.pika.dev/graphql@^14.6.0"
import { arc } from "https://cdn.pika.dev/@architect/functions"

const schema = buildSchema(`
  type Query {
    truth: Boolean
  }
  type Mutation {
    destroy(key: String!): Boolean
  }
`)

const resolvers = {
  Query: {
    truth: async function() {
      return true
    }
  },
  Mutation: {
    destroy: async function() {
      return true
    }
  }
}

export const handler = arc.http.async(async (request: any) => {
  try {
    console.log(request.body.query)
    let result = await graphql(schema, request.body.query, resolvers)
    return {
      body: JSON.stringify(result)
    }
  }
  catch(e) {
    return {
      body: JSON.stringify({ error: e.name, message: e.message, stack: e.stack })
    }
  }
})

// export async function handler (event: object) {
//   return {
//     statusCode: 200,
//     body: `api`
//   }
// }