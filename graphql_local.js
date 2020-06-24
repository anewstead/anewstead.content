const { createLocalServer } = require("./functions/server")

const server = createLocalServer();

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});