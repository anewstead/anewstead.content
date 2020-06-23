const fs = require("fs");
const data = fs.readFileSync(require.resolve("./data.json"));

const thumbs = data.map((item) => {
  const obj = {
    id: item.id,
    client: item.client,
    brand: item.brand,
    type: item.type,
    thumb: item.thumb,
    view: {
      type: item.view.type,
    },
  };
  return obj;
});

exports.handler = function (event, context, callback) {
  const output = thumbs;

  callback(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    body: `${output}`,
  });
};
