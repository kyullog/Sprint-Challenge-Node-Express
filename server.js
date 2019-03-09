const express = require("express");
const server = express();
const projectRouter = require("./routers/projectRouter");
const actionRouter = require("./routers/actionRouter");

server.use(express.json());
server.use("/projects", projectRouter);
server.use("/actions", actionRouter);

module.exports = server;
