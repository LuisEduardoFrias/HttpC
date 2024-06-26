import daj, { User } from 'dajts';
import RegisterHour from '../models/register_hour.js';
import { getByFingerPrint } from './employer_repo.js';

export function getAll() {
  return daj.getSync(RegisterHour.getInstance());
}

export function getById(id) {
  return daj.getByKeySync(RegisterHour.getInstance(), id);
}

//Generanun registro de la hora.
export function registerHour(registerHour, fingerprint) {
  if (!getByFingerPrint(fingerprint)) return null;

  const _registerHour = new RegisterHour(...registerHour);

  console.log(_registerHour);

  return daj.postSync(_registerHour);
}
