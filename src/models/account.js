/**
 * Class for "account" data model
 * @class
 *
 * @constructor
 *
 * @property id           the account id
 * @property name         the account name
 * @property serialNumber the account serial number (last 4 digit)
 * @property desc         the account description
 * @property balance      the account balance
 * */
export default class AccountModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.serialNumber = data.serialNumber;
    this.desc = data.desc;
    this.balance = data.balance;
  }

  /**
   * Get all account's information fields
   * @returns {Object}
   */
  get getAccount() {
    return {
      id: this.id,
      name: this.name,
      serialNumber: this.serialNumber,
      desc: this.desc,
      balance: this.balance
    }
  }
}
