import daj, { User } from 'dajts';
import Admin from '../models/admin.js';

function getCheckin() {
  return daj.getSync(User.getInstance());
}

function checkin(user, password) {
  const admin = new Admin(user, password);
  return daj.registerSync(admin);
}

export function login(user, password) {

  const resultToGC = getCheckin();
  //console.log('ver usurio:, ', JSON.stringify(resultToGC, null, 2))

  if (!resultToGC?.data) {
    const resultToCh = checkin(user, password);
    //console.log('agregar usuario: ', JSON.stringify(resultToCh, null, 2))

    if (resultToCh.error) return resultToCh.error;
  }

  const resultToLogin = daj.loginSync({ user, password });
  //console.log('inicial secion: ', JSON.stringify(resultToLogin, null, 2))

  if (resultToLogin.error) return resultToLogin.error;

  return resultToLogin;
}

export function logout(token) {
  if (daj.checkTokenSync({ token })) {
    const result = getCheckin();
    const { user, password } = result.data.find(e => e._token.token === token)
    return daj.logoutAsync({ user, password });
  }

  return null;
}
