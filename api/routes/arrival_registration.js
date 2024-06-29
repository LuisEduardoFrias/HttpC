import express from 'express';
import { router } from 'httpc';
import {
  getAll,
  getById,
  registerHour,
} from '../repositories/arrival_registration_repo.js';
//----------------------------

const app = new router(express);

app.use((req, res, next) => {
  console.log('in areas...');
  next();
});

app.get('/', (req, res, next) => {
  const result = getAll();

  if (result.error) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.status(200).json(result.data);
});

app.get('/:id', (req, res, next) => {
  const result = getById();

  if (result.error) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.status(200).json(result.data);
});

app.post(
  '/',
  (req, res, next) => {
    const { fingerprint } = req.body;

    const result = registerHour(fingerprint);

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    if (!result) {
      res.status(402).json({ error: 'Resource not found.' });
      return;
    }

    if (result.error) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.status(200).json(result.data);
  },
  ['fingerprint']
);

const arrival_registration = app.router();
export default arrival_registration;
