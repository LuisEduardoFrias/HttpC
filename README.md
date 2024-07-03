# HttpC

**HttpC** The HTTPC library is a tool that enables the visual exploration and querying of endpoints in an Express application in a graphical manner. By integrating this library into your project, a /httpc route is added, providing an interactive web interface similar to Swagger in ASP.NET. Through this interface, developers can directly explore and test the various endpoints of the Express application, including the ability to send parameters and data required for queries. HTTPC simplifies the development process by offering an intuitive and efficient way to interact with the API of the Express application.

Este es un módulo de Node.js.

##install

$ npm install httpc
$ yarn add httpc

## api/apimodels/employer - file

```javascript

export default class Employer {
  constructor(fingerPrint, userCardId, userName, userLastName) {
    super();
    this.fingerPrint = fingerPrint;
    this.userCardId = userCardId;
    this.userName = userName;
    this.userLastName = userLastName;
  }
}

```

## api/routes/employer - file

```javascript
// In this code, the router class from the 'httpc' library is used to define routes in the application.
// The router class is imported from 'httpc' and used to create a router in Express.
import express from 'express';
import { router } from 'httpc';
import Employer from '../models/employer.js';
import { create, getAll, getById, update, remove, } from '../repositories/employer_repo.js';

// The router class receives an Express object as a parameter in its constructor.
const app = new router(express);

// Allows defining routes with the GET, POST, PUT, and DELETE methods, just like express.

// Some functionalities of the router class:

// - Allows the use of middleware with the use method to perform common actions on all routes.
app.get('/:token',
  (req, res, next) => {
    const token = req.params.token;
    const result = getAll(token);

    if (!result) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (result.error) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.status(200).json(result.data);
  });

// Define routes using the POST method to handle POST requests. In these routes, you can specify an array of strings or the name of a class that identifies the JSON data expected in the request body.
//create employe
app.post(
  '/:token',
  (req, res, next) => {
    const token = req.params.token;
    const body = req.body;

    const result = create(body, token);

    if (!result) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (result.error) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.status(200).json(result);
  },
  Employer
);

/*
* more endpoint
*/

const employed = app.router();
export default employed;

```

## index file

```javascript

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// Help httpc create an HTTP client to consume the endpoints created in Express.
import gateway from 'httpc';

import Company from './models/company.js';

import company from './routes/company.js';

//----------------------------

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import gateway from 'httpc';

import Admin from './models/admin.js';

import arrival_registration from './routes/arrival_registration.js';
import employed from './routes/employed.js';
import register from './routes/register.js';

//----------------------------

// The getAttribute class receives an Express object as a parameter in its constructor.
// routes
const gate = new gateway(app);

//settings
app.set('protocol', 'http://');
app.set('domain', 'localhost:');
app.set('port', 8080); //process.env.port

//middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // combined
app.use(
  cors({
    origin: 'http://localhost:3000',
    accept: 'application/json',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// routes
const gate = new gateway(app);

// - Define routes using the POST method to handle POST requests. In these routes, you can specify an array of strings or the name of a class that identifies the JSON data expected in the request body.
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

gate.routes('/register', register);
gate.routes('/employed', employed);
gate.routes('/arrival_registration', arrival_registration);

gate.listen(() => console.log(`server on port:${app.get('port')}`));

```

