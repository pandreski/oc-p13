/**
 * Class for "all categories" data model
 * @class
 *
 * @constructor
 *
 * @property categories  The json data list
 * */
export default class CategoriesModel {
  constructor(data) {
    this.categories = data;
  }

  /**
   * Get all categories with its id and label.
   * @returns {Object[]}
   */
  get getCategories() {
    return Object.values(this.categories).map((elem) => (
      {
        id: elem.id,
        label: elem.label
      }
    ))
  }
}
