const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser());

app.post("/events", async (req, res) => {
        const { type, data } = req.body;
        console.log("get check");

        if (type === "CommentCreated") {
                const status = data.content.includes("orange") ? "rejected" : "approved";
                await axios.post("http://event-bus-srv:4005/events", {
                        type: "CommentModerated",
                        data: {
                                id: data.id,
                                postId: data.postId,
                                status,
                                content: data.content,
                        },
                });
        }

        res.send({});
});

app.listen(4003, () => {
        console.log("Listening on 4003");
});
