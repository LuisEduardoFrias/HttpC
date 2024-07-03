import daj, { User } from 'dajts';
import RegisterHour from '../models/register_hour.js';
import Cronos from '../models/cronos.js';
import { getByFingerPrint } from './employer_repo.js';

export function getAll(token) {
  if (!daj.checkTokenSync({ token })) return null;

  return daj.getSync(RegisterHour.getInstance());
}

export function getById(fingerprint) {
  const result = daj.getSync(RegisterHour.getInstance())

  if (result.error) return result;

  if (Array.isArray(result?.data)) {
    return result?.data?.findLast(e => e.userId === fingerprint);
  }

  return [result?.data].findLast(e => e.userId === fingerprint);
}

//Generanun registro de la hora.
export function registerHour(fingerprint) {
  const employe = getByFingerPrint(fingerprint)

  if (employe === null) return null;

  const result = getById(fingerprint);
  if (result?.error) return null;

  let register = null;
  if (result) {
    register = [result].findLast((e) => {
      const cronos = Cronos.fromString(e.datetime);

      if (cronos.date === new Cronos().date) return true;
    });
  }

  let input_output = true;
  if (register) input_output = !register.input_output;

  const _registerHour = new RegisterHour(fingerprint, input_output ? 'input' : 'output');

  const post = daj.postSync(_registerHour);
  post.data = { userName: employe.userName };

  return post;
}
