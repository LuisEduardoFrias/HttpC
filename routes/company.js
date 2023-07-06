const express = require("express");
const app = express.Router();

app.use((req, res, next) => {
  console.log("in areas...");
  next();
});

app.get("/areas", (req, res, next) => {
  res.status(404).json({ messaje: "areas home page get" });
});

app.get("/areas/:id", (req, res, next) => {
  res
    .status(300)
    .json({ messaje: "areas home page get - id: " + req.params.id });
});

app.post("/areas", (req, res, next) => {
  res.status(500).json({ messaje: "In areas post" });
});

app.put("/areas", (req, res, next) => {
  res.status(200).json({ messaje: "In areas put" });
});

app.delete("/areas/:id/:user/:pass", (req, res, next) => {
  res.status(404).json({
    messaje:
      "In areas delete" +
      req.params.id +
      "-" +
      req.params.user +
      "-" +
      req.params.pass,
  });
});

module.exports = app;
