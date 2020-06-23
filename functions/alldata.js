const fs = require("fs");
const data = fs.readFileSync(require.resolve(__dirname, "data.json"));

exports.handler = function (event, context, callback) {
  const output = data;

  callback(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    body: `${output}`,
  });
};
