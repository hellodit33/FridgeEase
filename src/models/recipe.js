class Recipe {
  constructor(
    id,
    years,
    title,
    author,
    type,
    ratings,
    pages,
    imageUrl,
    synopsis,

    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree
  ) {
    this.id = id;
    this.years = years;
    this.title = title;
    this.author = author;
    this.type = type;
    this.ratings = ratings;
    this.pages = pages;
    this.imageUrl = imageUrl;
    this.synopsis = synopsis;

    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegetarian = isVegetarian;
    this.isLactoseFree = isLactoseFree;
  }
}

export default Recipe;
