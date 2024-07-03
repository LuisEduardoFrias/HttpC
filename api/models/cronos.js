export default class Cronos {
  constructor() {
    const _date = new Date();
    const time = new Date();

    this.day = _date.getDate();
    this.month = _date.getMonth() + 1;
    this.year = _date.getFullYear();

    this.date = `${this.day.toString().padStart(2, '0')}/${this.month
      .toString()
      .padStart(2, '0')}/${this.year}`;

    this.hour12 = time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const partTime = timePart(this.hour12);

    this.hour = partTime.hour;
    this.minute = partTime.minute;
    this.second = partTime.second;

    this.dateTime = `${this.date} ${this.hour12}`;
  }

  static fromString(dateString) {
    const [datePart, _timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');

    const partTime = timePart(_timePart);

    const cronos = new Cronos();
    cronos.day = day;
    cronos.month = month;
    cronos.year = year;
    cronos.date = `${day}/${month}/${year}`;
    cronos.hour12 = _timePart;
    cronos.hour = partTime.hour;
    cronos.minute = partTime.minute;
    cronos.second = partTime.second;
    cronos.dateTime = dateString;

    return cronos;
  }
}

function timePart(time) {
  let [hour, minute, second] = time.split(':');
  const isPM = time.includes('pm');

  if (isPM && hour !== '12') {
    hour = String(Number(hour) + 12);
  } else if (!isPM && hour === '12') {
    hour = '00';
  }

  return { hour, minute, second };
}
