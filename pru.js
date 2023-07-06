const express = require("express");
const path = require("path");
const gateway = require("./gateway");
const company = require("./routes/company");
const employed = require("./routes/employed");
const cors = require("cors");
const morgan = require("morgan");

require("ejs");

const app = express();

//settings
//app.set("protocol", "http//");
//app.set("domain", "localhost:");
app.set("port", 8000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views/pages"));
//middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev")); // combined
app.use(cors());
// routes
const gate = new gateway(app);

const data = [
  { Key: "1", Name: "C#", ImageName: "cShart.png" },
  { Key: "2", Name: "React", ImageName: "react.png" },
  { Key: "3", Name: "Html 5", ImageName: "html5.png" },
  { Key: "4", Name: "Css 3", ImageName: "css3.png" },
  { Key: "5", Name: "Java Script", ImageName: "javaScript.png" },
  { Key: "6", Name: "Sql Server", ImageName: "sqlServer.png" },
  { Key: "7", Name: "Oracle", ImageName: "oracle.png" },
  { Key: "8", Name: "Type Script", ImageName: "typeScript.png" },
  { Key: "9", Name: "GitHub", ImageName: "github.svg" },
  { Key: "10", Name: "Node", ImageName: "node.png" },
  { Key: "11", Name: "BootStrap", ImageName: "bootStrap.png" },
];


gate.get("/skills", (req, res) => {
  console.log("skill get")
  res.status(200).json(data);
});

gate.post("/skills", (req, res) => {
  console.info(req.body);
  res.status(200).json({ message: "added", data: req.body });
});

gate.routes("/company", company);
gate.routes("/employed", employed);
gate.api();

app.listen(app.get("port"), () =>
  console.log(`server on port:${app.get("port")}`)
);

