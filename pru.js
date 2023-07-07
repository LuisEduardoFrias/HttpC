const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const gateway = require("./index");
const company = require("./routes/company");
const employed = require("./routes/employed");

const app = express();

//settings
//app.set("protocol", "http//");
//app.set("domain", "localhost:");
app.set("port", 8000);
//middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev")); // combined
app.use(cors());
// routes
const gate = new gateway(app);

const _data = [
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
  res.status(200).json(_data);
})

gate.get("/skills/:id", (req, res) => {
  res
    .status(200)
    .json({ messaje: "skills get - id: " + req.params.id });
});

gate.delete("/skills/:id/:user/:pass", (req, res) => {
  
  const id = req.params.id;
  const user = req.params.user;
  const pass = req.params.pass;
  
  res
    .status(200)
    .json({ message: "added", data: { id, user, pass}});
});


gate.post("/areas", (req, res, next) => {
  
setTimeout(function(){
    res.status(200).json({ messaje: "post area", data: req.body });
}, 3000);

  
});

gate.put("/cargos", (req, res, next) => {
  res.status(200).json({ messaje: "put cargo", data: req.body });
});

gate.post("/empleados", (req, res, next) => {
  res.status(200).json({ messaje: "post emplesdos", data: req.body });
});

gate.put("/ventas", (req, res, next) => {
  res.status(200).json({ messaje: "put ventas", data: req.body});
});

//gate.routes("/company", company);
//gate.routes("/employed", employed);

gate.api();

app.listen(app.get("port"), () =>
  console.log(`server on port:${app.get("port")}`)
);

