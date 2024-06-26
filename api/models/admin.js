import { User } from 'dajts';

export default class Admin extends User {
  constructor(user, password, userName, userCardId) {
    super(user, password);
    this.userName = userName;
    this.userCardId = userCardId;
  }
}