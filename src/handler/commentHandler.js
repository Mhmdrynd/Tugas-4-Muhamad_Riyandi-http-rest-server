const https = require("https");

const commentHandler = {};

commentHandler.getAllComments = (req, res) => {
  https.get("https://jsonplaceholder.typicode.com/comments", (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      const comments = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(comments));
    });
  });
};

module.exports = commentHandler;
