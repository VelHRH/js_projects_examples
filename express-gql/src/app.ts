import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers, typeDefs } from "./graphql";

dotenv.config();
const port = process.env.PORT || 4444;

const bootstrapApp = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use("/graphql", expressMiddleware(server));

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}/graphql`);
  });
};

export default bootstrapApp;
