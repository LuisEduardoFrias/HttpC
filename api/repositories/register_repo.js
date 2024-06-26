import daj, { User } from 'dajts';
import Admin from '../models/admin.js';

export function getCheckin() {
  return daj.getSync(User.getInstance());
}

export function checkin(user, password, userName, userCardId) {
  const admin = new Admin(user, password, userName, userCardId);
  return daj.registerSync(admin);
}

export function login(user, password) {
  return daj.loginSync({ user, password });
}

export function logout(user, password, token) {
  if (daj.checkTokenSync({ token })) return daj.logoutAsync({ user, password });

  return null;
}
