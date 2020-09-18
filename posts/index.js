const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser());
const posts = {};

app.use(cors());
app.get("/posts", (req, res) => {
        res.send(posts);
});

app.post("/posts", (req, res) => {
        const id = randomBytes(4).toString("hex");

        const { title } = req.body;
        posts[id] = {
                id,
                title,
        };

        axios.post("http://event-bus-srv:4005/events", {
                type: "PostCreated",
                data: {
                        id,
                        title,
                },
        });
        res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
        console.log("gello", req.body.type);

        res.send({});
});

app.listen(4000, () => {
        console.log("v30");
        console.log("Listening on port 4000");
});
