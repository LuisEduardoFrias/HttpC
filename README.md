# HttpC
HttpC is a node.js package for test the endpoint in un server with Express middleware.

This is a Node.js module. Installation is done using the npm install command:

$ npm install ["url"] (https://github.com/LuisEduardoFrias/HttpC.git)

Usage

const express = require("express");

const exampleRoutes = require("./routes/exampleRoutes");

require("ejs");

const app = express();

//settings

*app.set("protocol", "http//");
*app.set("domain", "localhost:");
*app.set("port", 8000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views/pages"));
//middlewares

app.use(express.static(__dirname + "/public"));

*const gate = new gateway(app);

// routes

*gate.get("/skills", (req, res) => {
  console.log("skill get")
  res.status(200).json(data);
});

*gate.post("/skills", (req, res) => {
  console.info(req.body);
  res.status(200).json({ message: "added", data: req.body });
});

*gate.routes("/example_routes", exampleRoutes;
*gate.api();

app.listen(app.get("port"), () =>
  console.log(`server on port:${app.get("port")}`)
);

