import daj, { User } from 'dajts';
import Employer from '../models/employer.js';

export function getAll(token) {
  if (!daj.checkTokenSync({ token })) return null;
  return daj.getSync(Employer.getInstance());
}

export function getById(id) {
  return daj.getByKeySync(Employer.getInstance(), id);
}

export function getByFingerPrint(fingerprint) {
  const _employe = daj.getSync(Employer.getInstance());

  if (_employe.error !== null || _employe?.data === null) return null;

  return _employe.data.find((emp) => emp.fingerPrint == fingerprint);
}

export function create(employer, token) {
  if (!daj.checkTokenSync({ token })) return null;

  return daj.postSync(new Employer(
    employer.fingetprint,
    employer.usercardid,
    employer.username,
    employer.userlastname,
  ));
}

export function update(id, employer, token) {
  if (!daj.checkTokenSync({ token })) return null;

  const _employer = new Employer(...employer);

  //console.log(_employer);

  return daj.putSync(_employer);
}

export function remove(id, token) {
  if (!daj.checkTokenSync({ token })) return null;

  const obj = daj.getByKeySync(Employer.getInstance(), id);

  return daj.deleteAsync(obj);
}
