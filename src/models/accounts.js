/**
 * Class for "all accounts" data model
 * @class
 *
 * @constructor
 *
 * @property data  the json data list
 * */
export default class AccountsModel {
  constructor(data) {
    this.accounts = data;
  }

  /**
   * Get all accounts with details.
   * @returns {Object[]}
   */
  get getAll() {
    return Object.values(this.accounts).map((account) => ({
      id: account.id,
      name: account.name,
      serialNumber: account.serialNumber,
      desc: account.desc,
      balance: account.balance
    }));
  }
}
