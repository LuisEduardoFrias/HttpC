# HttpC

**HttpC** The HTTPC library is a tool that enables the visual exploration and querying of endpoints in an Express application in a graphical manner. By integrating this library into your project, a /httpc route is added, providing an interactive web interface similar to Swagger in ASP.NET. Through this interface, developers can directly explore and test the various endpoints of the Express application, including the ability to send parameters and data required for queries. HTTPC simplifies the development process by offering an intuitive and efficient way to interact with the API of the Express application.

Este es un módulo de Node.js.

##install

$ npm install httpc
$ yarn add httpc

## models/Company file

```javascript

export default class Company {
    constructor(name, industry, location) {
        this.name = name;
        this.industry = industry;
        this.location = location;
    }
}

```

## routes/Company file

```javascript
// En este código se utiliza la clase router de la librería 'httpc' para definir rutas en la aplicación.
// La clase router se importa de 'httpc' y se utiliza para crear un enrutador en Express.
import express from 'express';
import { router } from 'httpc';
import Employer from '../models/employer.js';

// La clase router recibe un objeto de Express como parámetro en su constructor.
const app = new router(express);


app.use((req, res, next) => {
    console.log("in areas...");
    next();
});

// Permite definir rutas con los métodos GET, POST, PUT y DELETE, al igual queexpress.

// Algunas funcionalidades de la clase router:

// - Permite el uso de middleware con el método use para realizar acciones comunes en todas las rutas.
app.get("/areas", (req, res, next) => {
    res.status(404).json({ messaje: "areas home page get" });
});

app.get("/areas/:id", (req, res, next) => {
    res.status(300).json({
        messaje: "areas home page get - id: " + req.params.id
    });
});

// - Define rutas con el método post para peticiones POST, donde se puede especificar un array de strings o nombre de una clase que identifican los datos que se esperan en el body.
app.post("/areas/:id", (req, res, next) => {
    const numbers = req.body;
    const arrayNumbers = numbers.split(","); 

    res.status(500).json({ message: "In areas post", value: arrayNumbers[parseInt(req.params.id)] });
}, ["numbers"]);

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

const company = app.router();
export default company;

```

## index file

```javascript

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// - Ayuda a httpc a crear un cliente HTTP para consumir los endpoints creados en Express.
import gateway from 'httpc';

import Company from './models/company.js';

import company from './routes/company.js';

//----------------------------

const app = express();

//settings
app.set('protocol', 'http://');
app.set('domain', 'localhost:');
app.set('port', 8080); //process.env.port

//middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // combined
app.use(cors());

// La clase getAttribute recibe un objeto de Express como parámetro en su constructor.
// routes
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

// - Define rutas con el método post para peticiones POST, donde se puede especificar un array de strings o nombre de una clase que identifican los datos que se esperan en el body.
gate.post("/areas", (req, res, next) => {
    const { number1, number2, number3 } = req.body;
    
    const num1 = parseInt(number1);
    const num2 = parseInt(number2);
    const num3 = parseInt(number3);

    setTimeout(function () {
        const result = num1 + (num2 - num3);
        res.status(200).json({ message: "post area", data: result });
    }, 3000);
},["number1","number2","number3"]);

gate.post("/cargos", (req, res, next) => {
    res.status(200).json({ messaje: "put cargo", data: req.body });
}, Company);

gate.post("/empleados", (req, res, next) => {
    res.status(200).json({ messaje: "post empleados", data: req.body });
},["name","lastname","age"]);

gate.put("/ventas", (req, res, next) => {
    res.status(200).json({ messaje: "put ventas", data: req.body });
});

gate.routes("/company", company);

gate.listen(() => console.log(`server on port:${app.get('port')}`));

```

