# HttpC

**HttpC** es un paquete de node.js para probar los endpoints en un servidor con middleware de Express.

Este es un módulo de Node.js. La instalación se realiza utilizando el comando npm install:

$ npm install ["url"] (https://github.com/LuisEduardoFrias/HttpC.git)

## Uso

* Código requerido.

## index

```javascript
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const gateway = require("httpc");

const company = require("./company");

const app = express();

// Configuraciones
app.set("protocol", "http//");
app.set("domain", "localhost:");
app.set("port", 8080);

// Middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

// Rutas

const gate = new gateway(app);

gate.get("/skills", (req, res) => {
    res.status(200).json([{ Key: "1", Name: "C#", ImageName: "cShart.png" }]);
});

gate.get("/skills/:id", (req, res) => {
    res.status(200).json({ messaje: "skills get - id: " + req.params.id });
});

gate.delete("/skills/:id/:user/:pass", (req, res) => {
    const id = req.params.id;
    const user = req.params.user;
    const pass = req.params.pass;

    res.status(200).json({ message: "added", data: { id, user, pass } });
});

gate.post("/areas", (req, res, next) => {
    setTimeout(function () {
        res.status(200).json({ messaje: "post area", data: req.body });
    }, 3000);
});

gate.put("/cargos", (req, res, next) => {
    res.status(200).json({ messaje: "put cargo", data: req.body });
});

gate.post("/empleados", (req, res, next) => {
    res.status(200).json({ messaje: "post empleados", data: req.body });
});

gate.put("/ventas", (req, res, next) => {
    res.status(200).json({ messaje: "put ventas", data: req.body });
});

gate.routes("/company", company);

gate.api();

app.listen(app.get("port"), () =>
    console.log(`server on port:${app.get("port")}`)
);
```

## Company file

```javascript

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
    res.status(300).json({
        messaje: "areas home page get - id: " + req.params.id
    });
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
            req.params.pass
    });
});

module.exports = app;

```
