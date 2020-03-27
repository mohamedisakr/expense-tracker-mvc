import {
  generateId,
  getTransactionAmount,
  calculateSum,
  getGreaterThanZero,
  getLessThanZero
} from "./utils.js";

export default class Model {
  constructor() {
    this.transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    console.log(this.transactions);
  }

  addTransaction(text, amount) {
    const transaction = {
      id:
        this.transactions.length > 0
          ? this.transactions[this.transactions.length - 1].id + 1
          : 1,
      text,
      amount: parseFloat(amount)
    };
    this.transactions.push(transaction);
    // this.onTransactionListChanged(this.transactions);
    this._commit(this.transactions);
  }

  deleteTransaction(id) {
    this.transactions = this.transactions.filter(item => item.id !== id);
    // this.onTransactionListChanged(this.transactions);
    this._commit(this.transactions);
  }

  bindTransactionListChanged(callback) {
    this.onTransactionListChanged = callback;
  }

  bindIncomeChanged(callback) {
    this.onIncomeChanged = callback;
  }

  bindBalanceChanged(callback) {
    this.onBalanceChanged = callback;
  }

  bindExpensesChanged(callback) {
    this.onExpensesChanged = callback;
  }

  getIncome() {
    const amounts = this.transactions.map(getTransactionAmount);
    const income = amounts
      .filter(getGreaterThanZero)
      .reduce(calculateSum, 0)
      .toFixed(2);
    return income;
  }

  getBalance() {
    const amounts = this.transactions.map(getTransactionAmount);
    const total = amounts.reduce(calculateSum, 0).toFixed(2);
    return total;
  }

  getExpenses() {
    const amounts = this.transactions.map(getTransactionAmount);
    const expenses = amounts
      .filter(getLessThanZero)
      .reduce(calculateSum, 0)
      .toFixed(2);
    return expenses;
  }

  _commit(transactions) {
    this.onTransactionListChanged(this.transactions);
    this.onBalanceChanged(this.getBalance());
    this.onIncomeChanged(this.getIncome());
    this.onExpensesChanged(this.getExpenses());
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
}
