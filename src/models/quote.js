export class Quote {
  constructor(book, page, imageUri) {
    this.book = book;
    this.page = page;
    this.imageUri = imageUri;

    this.id = new Date().toString() + Math.random().toString();
  }
}
