const express = require("express");

const PORT = 3000;
const HOST = "0.0.0.0";

express().get("/", (request, response) => {
  response.send("Hello docker :D");
});

express().listen(PORT, HOST);
