import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    resolvers: {
      Todo: {
        user: async (todo) => {
          const data = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${todo.userId}`,
          );
          return data.data;
        },
      },
      Query: {
        getTodos: async () => {
          const data = await axios.get(
            "https://jsonplaceholder.typicode.com/todos/",
          );
          return data.data;
        },
        getAllUsers: async () => {
          const data = await axios.get(
            "https://jsonplaceholder.typicode.com/users/",
          );
          return data.data;
        },
        getUser: async (parent, { id }) => {
          const data = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`,
          );
          return data.data;
        },
      },
    },
    typeDefs: `
    type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
    }

    type Todo {
      id: ID!
      title: String!
      completed: Boolean!
      user: User
      userId: ID
    }
    type Query {
      getTodos: [Todo]
      getAllUsers: [User]
      getUser(id: ID!): User
    }
    `,
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => console.log("Server started at port 8000"));
}
startServer();
