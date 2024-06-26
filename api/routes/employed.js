import express from 'express';
import { router } from 'httpc';
import Employer from '../models/employer.js';
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from '../repositories/employer_repo.js';

const app = new router(express);

app.get('/', (req, res, next) => {
  const result = getAll();

  if (result.error) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.status(200).json(result.data);
});

app.get('/:id', (req, res, next) => {
  const result = getById(res.params.id);

  if (result.error) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.status(200).json(result.data);
});

app.post(
  '/:token',
  (req, res, next) => {
    const result = create(res.bady, res.params.token);

    if (result.error) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.status(200).json(result);
  },
  Employer
);

app.put(
  '/:id/:token',
  (req, res) => {
    const result = update(req.params.id, req.body, res.params.token);

    if (result.error) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.status(200).json(result.data);
  },
  Employer
);

app.delete('/:id/:token', (req, res, next) => {
  const result = remove(req.params.id, res.params.token);

  if (result.error) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.status(200).json(result.data);
});

const employed = app.router();
export default employed;
