import { ApolloServer } from "@apollo/server";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { db } from "./db";
import { resolvers, typeDefs } from "./qraphql";

const port = 4444;

const bootstrapApp = async () => {
  try {
    await db.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
  }

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  app.use(express.json());
  app.use("/graphql", expressMiddleware(server));

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}/graphql`);
  });
};

export default bootstrapApp;