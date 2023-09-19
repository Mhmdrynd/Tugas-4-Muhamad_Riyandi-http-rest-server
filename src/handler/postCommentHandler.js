const https = require("https");

const postCommentHandler = {};

postCommentHandler.getPostsWithComments = (req, res) => {
  https.get("https://jsonplaceholder.typicode.com/posts", (postResponse) => {
    let postData = "";

    postResponse.on("data", (postChunk) => {
      postData += postChunk;
    });

    postResponse.on("end", () => {
      const posts = JSON.parse(postData);

      https.get(
        "https://jsonplaceholder.typicode.com/comments",
        (commentResponse) => {
          let commentData = "";

          commentResponse.on("data", (commentChunk) => {
            commentData += commentChunk;
          });

          commentResponse.on("end", () => {
            const comments = JSON.parse(commentData);

            const postsWithComments = posts.map((post) => {
              post.comments = comments.filter(
                (comment) => comment.postId === post.id
              );
              return post;
            });

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(postsWithComments));
          });
        }
      );
    });
  });
};

module.exports = postCommentHandler;
