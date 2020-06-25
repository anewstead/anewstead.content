const ApolloServer = require("apollo-server").ApolloServer;
const ApolloServerLambda = require("apollo-server-lambda").ApolloServer;
const { typeDefs, resolvers } = require("./logic");

// live
function createLambdaServer() {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

// localhost
function createLocalServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

module.exports = { createLambdaServer, createLocalServer };
