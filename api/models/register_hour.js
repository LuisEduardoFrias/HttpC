import { DajB } from 'dajts';

import Cronos from '../models/cronos.js';
export default class RegisterHour extends DajB {
  constructor(userId, input_output) {
    super();
    this.userId = userId;
    this.datetime = new Cronos().dateTime;
    //true is input and false is output
    this.input_output = input_output;
  }
}
