/**
 * Class for "all accounts" data model
 * @class
 *
 * @constructor
 *
 * @property data  the json data list
 * */
export default class TransactionsModel {
  constructor(data) {
    this.transactions = data;
  }

  /**
   * Get all accounts with details.
   * @returns {Object[]}
   */
  get getTransactions() {
    return Object.values(this.transactions).map((transaction) => ({
      id: transaction.id,
      account: transaction.account,
      description : transaction.description,
      amount: transaction.amount,
      balance: transaction.balance,
      date: transaction.date,
      type: transaction.type,
      category: transaction.category,
      notes: transaction.notes
    }));
  }
}
