export class Event {
  constructor(date, host, book, location) {
    this.date = date;
    this.host = host;
    this.book = book;
    this.location = { lat: location.lat, lng: location.lng };
    this.id = new Date().toString() + Math.random().toString();
  }
}
