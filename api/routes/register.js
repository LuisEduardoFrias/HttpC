import express from 'express';
import { router } from 'api_httpc';
import { login, logout } from '../repositories/register_repo.js';
import Admin from '../models/admin.js';

const app = new router(express);

app.post(
  '/login',
  (req, res) => {
    const { user, password } = req.body;

    const result = login(user, password);

    if (result.token === null) {
      res.status(402).json({
        message: 'No autenticado',
      });
      return;
    }

    res.status(200).json({ token: result.token });
  },
  ['user', 'password']
);

app.post(
  '/logout/:token',
  (req, res) => {
    const result = logout(req.params.token);

    if (result === false) {
      res.status(404).json({
        message: 'not resgister found.',
      });
      return;
    }

    if (!result) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    res.status(200).json({ message: 'success' });
  }
);

const register = app.router();
export default register;