import express from 'express';
import { router } from 'api_httpc';
import {
  getAll,
  getById,
  registerHour,
} from '../repositories/arrival_registration_repo.js';
//----------------------------

const app = new router(express);

app.get('/:token', (req, res, next) => {
  const token = req.params.token;

  const result = getAll(token);
  //console.log("result: ", JSON.stringify(result));

  if (!result) {
    res.status(401).json({ message: 'Unauthorized.' });
    return;
  }

  if (result.error) {
    res.status(500).json({ error: result.error });
    return;
  }

  if (!result.error && !result?.data) {
    res.status(402).json({ message: 'Not data found.' });
    return;
  }

  res.status(200).json(result.data);
});

app.post(
  '/',
  (req, res, next) => {
    const { fingerprint } = req.body;

    const result = registerHour(fingerprint);

    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

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
