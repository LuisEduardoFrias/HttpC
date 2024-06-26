import { DajB } from 'dajts';

export default class RegisterHour extends DajB {
  constructor(datetime, userId) {
    super();
    this.datetime = new Date();
    this.userId = userId;
  }
}
