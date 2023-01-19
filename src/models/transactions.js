/**
 * Class for "all accounts" data model
 * @class
 *
 * @constructor
 *
 * @property transactions  the json data list
 */
export default class TransactionsModel {
  constructor(data) {
    this.transactions = data;
  }

  /**
   * Get month name from index.
   * @param {Number} index The month index (0 = January)
   * @returns {String} Month label
   */
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

  /**
   * Get the date with the proper suffix (th | st | nd | rd).
   * @param {Number} day Day number
   * @returns {String} Day with suffix (e.g.: "22nd")
   */
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

  /**
   * Get full formatted date.
   * @param {String} timestamp Date timestamp
   * @returns {String} Formatted date (e.g.: May 4th, 2022)
   */
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
