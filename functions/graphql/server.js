const { createLambdaServer } = require('./create-server')

const server = createLambdaServer();

exports.handler = server.createHandler({
  cors: {
    origin: '*'
  }
});