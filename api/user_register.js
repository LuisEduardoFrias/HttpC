import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import gateway from 'httpc';

import Admin from './models/admin.js';

import arrival_registration from './routes/arrival_registration.js';
import employed from './routes/employed.js';
import register from './routes/register.js';

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
app.use(
  cors({
    origin: 'http://localhost:3000',
    accept: 'application/json',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// routes
const gate = new gateway(app);

gate.routes('/register', register);
gate.routes('/employed', employed);
gate.routes('/arrival_registration', arrival_registration);

gate.listen(() => console.log(`server on port:${app.get('port')}`));
