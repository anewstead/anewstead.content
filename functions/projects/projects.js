const querystring = require("querystring");
const fs = require("fs");

const data = JSON.parse(
  fs.readFileSync(require.resolve("./data.json"), "utf8")
);

exports.handler = function (event, context, callback) {
  let output = "";

  const params = querystring.parse(event.body);

  if (params.thumbs) {
    const thumbs = data.map((item) => {
      return {
        id: item.id,
        client: item.client,
        brand: item.brand,
        type: item.type,
        thumb: item.thumb,
        view: {
          type: item.view.type,
        },
      };
    });
    output = JSON.stringify(thumbs);
  } else if (params.id) {
    const id = data.filter((item) => {
      return item.id === params.id;
    });
    output = JSON.stringify(id);
  } else {
    output = JSON.stringify(data);
  }

  callback(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    body: `${output}`,
  });
};
