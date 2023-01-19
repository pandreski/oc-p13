/**
 * Class for "all accounts" data model
 * @class
 *
 * @constructor
 *
 * @property data  the json data list
 */
export default class TransactionsModel {
  constructor(data) {
    this.transactions = data;
  }

  getMonthName(index) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    return months[index];
  }

  getDayWithSuffix(day) {
    const first = [1, 21, 31];
    const second = [2, 22];
    const third = [3, 23];

    if (first.includes(day)) {
      return `${day}st`;
    } else if (second.includes(day)) {
      return `${day}nd`;
    } else if (third.includes(day)) {
      return `${day}rd`;
    }
    return `${day}th`;
  }

  getFormattedDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const month = this.getMonthName(date.getMonth());
    const day = this.getDayWithSuffix(date.getDate());
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
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
      date: this.getFormattedDate(transaction.date),
      type: transaction.type,
      category: transaction.category,
      notes: transaction.notes
    }));
  }
}
