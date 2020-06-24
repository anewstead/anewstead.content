const { createLambdaServer } = require('./server')

const server = createLambdaServer();

exports.handler = server.createHandler({
  cors: {
    origin: '*'
  }
});