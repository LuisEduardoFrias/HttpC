import express from 'express';
import { router } from 'httpc';
import Admin from '../models/admin.js';
import {
  checkin,
  getCheckin,
  login,
  logout,
} from '../repositories/register_repo.js';

const app = new router(express);

app.get('/admins', (req, res) => {
  const result = getCheckin();

  if (result.error || !result?.data) {
    res.status(500).json({ error: result.error ?? 'error' });
    return;
  }

  res.status(200).json(result.data);
});

app.post(
  '/checkin',
  (req, res) => {
    console.log('prueba....');
    const { user, password, userName, userCardId } = req.body;
    const result = checkin(user, password, userName, userCardId);

    if (result.error || !result?.data) {
      res.status(500).json({ error: result.error ?? 'error' });
      return;
    }

    res.status(200).json(result);
  },
  Admin
);

app.post(
  '/login',
  (req, res) => {
    const { user, password } = req.body;
    const result = login(user, password);

    if (!result.token) {
      res.status(404).json({
        message: 'No se encontro el recurso solicitado.',
      });
      return;
    }

    if (result.error || !result?.data) {
      res.status(500).json({ error: result.error ?? 'error' });
      return;
    }

    res.status(200).json({ token: result.token });
  },
  ['user', 'password']
);

app.post(
  '/logout',
  (req, res) => {
    const { user, password, token } = req.body;
    const result = logout(user, password, token);

    if (result === false) {
      res.status(404).json({
        message: 'No se encontro el recurso solicitado.',
      });
      return;
    }

    if (result === null) {
      res
        .status(401)
        .json({ message: 'Se necesita un token de autenticación valido.' });
      return;
    }

    res.status(200).json({ message: 'success' });
  },
  ['user', 'password', 'token']
);

const register = app.router();
export default register;
