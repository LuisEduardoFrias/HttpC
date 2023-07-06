const express = require("express");
const app = express.Router();

app.get("/positions", (req, res, next) => {
  console.log("get positions birds");
  res.status(200).json({ messaje: "positions home page get" });
});

app.get("/positions/:id", (req, res, next) => {
  res
    .status(200)
    .json({ messaje: "positions home page get - id: " + req.params.id });
});

app.post("/positions", (req, res, next) => {
  res.status(200).json({ messaje: "In positions post" });
});

app.put("/positions", (req, res) => {
  res.status(200).json({ messaje: "In positions put" });
});

app.delete("/positions/:id/:user", (req, res, next) => {
  res.status(200).json({
    messaje: "In positions delete" + req.params.id + "-" + req.params.user,
  });
});

module.exports = app;
