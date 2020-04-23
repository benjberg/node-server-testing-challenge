const express = require("express");

const users = require("../users/user-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/users", (req, res) => {
  users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/users", (req, res) => {
  const userInfo = req.body;

  users.insert(userInfo)
    .then(ids => {
      res.status(201).json({ message: "user created successfully" });
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = server;