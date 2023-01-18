export default class CategoriesModel {
  constructor(data) {
    this.categories = data;
  }

  get getCategories() {
    return Object.values(this.categories).map((elem) => (
      {
        id: elem.id,
        label: elem.label
      }
    ))
  }
}
