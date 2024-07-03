import { DajB } from 'dajts';

export default class Employer extends DajB {
  constructor(fingerPrint, userCardId, userName, userLastName) {
    super();
    this.fingerPrint = fingerPrint;
    this.userCardId = userCardId;
    this.userName = userName;
    this.userLastName = userLastName;
  }
}