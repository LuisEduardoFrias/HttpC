import express from 'express';
import { router } from 'httpc';
import Employer from '../models/employer.js';
import { create, getAll, getById, update, remove, } from '../repositories/employer_repo.js';

const app = new router(express);

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

app.get('/:id', (req, res, next) => {
  const result = getById(res.params.id);

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

//create employe
app.post(
  '/:token',
  (req, res, next) => {
    const token = req.params.token;
    const body = req.body;

    const result = create(body, token);

   //console.log("result: ", JSON.stringify(result))

    if (!result) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (result.error) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.status(200).json(result);
  }
);

//update employe0
app.put(
  '/:id/:token',
  (req, res) => {
    res.status(200).json({ message: 'OKEY' });

    const result = update(req.params.id, req.body, res.params.token);

    if (result.error) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.status(200).json(result.data);
  },
  Employer
);

//delete employe0
app.delete('/:id/:token', (req, res, next) => {
  res.status(200).json({ message: 'OKEY' });

  const result = remove(req.params.id, res.params.token);

  if (result.error) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.status(200).json(result.data);
});

const employed = app.router();
export default employed;
