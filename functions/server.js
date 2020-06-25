const ApolloServer = require("apollo-server").ApolloServer;
const ApolloServerLambda = require("apollo-server-lambda").ApolloServer;
const { gql } = require("apollo-server-lambda");
const fs = require("fs");
const path = require("path");

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/projects/data.json"), "utf8")
);

const typeDefs = gql`
  type View {
    type: String!
    width: Int
    height: Int
    href: String
    stills: [String]
  }

  type Project {
    id: String!
    client: String!
    brand: String!
    project: String!
    type: String!
    tech: String!
    thumb: String!
    info: String!
    view: View!
  }

  type Query {
    projects: [Project]
    project(id: ID!): Project
  }
`;

const resolvers = {
  Query: {
    projects: () => {
      return data;
    },
    project: (parent, { id }) => {
      return data.find((item) => {
        return String(item.id) === String(id);
      });
    },
  },
};

// for live
function createLambdaServer() {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

// for localhost
function createLocalServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

module.exports = { createLambdaServer, createLocalServer };
