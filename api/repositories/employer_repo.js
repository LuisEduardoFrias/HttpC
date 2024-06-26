import daj, { User } from 'dajts';
import Employer from '../models/employer.js';

export function getAll() {
  return daj.getSync(Employer.getInstance());
}

export function getById(id) {
  return daj.getByKeySync(Employer.getInstance(), id);
}

export function getByFingerPrint(id) {
  const _employer = daj.getSync(Employer.getInstance());

  return _employer.find((emp) => emp.fingerPrint === id);
}

export function create(employer, token) {
  if (!daj.checkTokenSync({ token })) return null;

  const _employer = new Employer(...employer);

  console.log(_employer);

  return daj.postSync(_employer);
}

export function update(id, employer, token) {
  if (!daj.checkTokenSync({ token })) return null;

  const _employer = new Employer(...employer);

  console.log(_employer);

  return daj.putSync(_employer);
}

export function remove(id, token) {
  if (!daj.checkTokenSync({ token })) return null;

  const obj = daj.getByKeySync(Employer.getInstance(), id);

  return daj.deleteAsync(obj);
}
