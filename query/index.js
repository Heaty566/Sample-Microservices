const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
        res.send(posts);
});

app.post("/events", (req, res) => {
        const { type, data } = req.body;

        if (type === "PostCreated") {
                const { id, title } = data;
                posts[id] = { id, title, comments: [] };
        }

        if (type === "CommentCreated") {
                const { id, content, postId, status } = data;
                const post = posts[postId];

                if (post.comments) {
                        post.comments.push({ id, content, status });
                } else {
                        post.comments = [];
                }
        }

        if (type === "CommentUpdated") {
                const { id, content, postId, status } = data;
                const post = posts[postId];

                const comment = post.comments.find((item) => item.id === id);

                comment.status = status;
                comment.content = content;
        }

        res.send({});
});

app.listen(4002, () => {
        console.log("Listening on port 4002");
});
