import {
  generateId,
  getTransactionAmount,
  calculateSum,
  getGreaterThanZero,
  getLessThanZero
} from "./utils.js";

export default class Model {
  constructor() {
    this.transactions = [
      { id: 39466881, text: "Camera", amount: -3000 },
      { id: 19309512, text: "salary", amount: 30000 },
      { id: 33293802, text: "alcohel", amount: -200 },
      { id: 96557521, text: "laptop", amount: -15000 }
    ];
  }

  addTransaction(text, amount) {
    const transaction = {
      id:
        this.transactions.length > 0
          ? this.transactions[this.transactions.length - 1].id + 1
          : 1,
      text,
      amount
    };
    this.transactions.push(transaction);
    this.onTransactionListChanged(this.transactions);
  }

  deleteTransaction(id) {
    this.transactions = this.transactions.filter(item => item.id !== id);
    this.onTransactionListChanged(this.transactions);
  }

  bindTransactionListChanged(callback) {
    this.onTransactionListChanged = callback;
  }

  getIncome() {
    const amounts = this.transactions.map(getTransactionAmount);
    const income = amounts
      .filter(getGreaterThanZero)
      .reduce(calculateSum)
      .toFixed(2);
    return income;
  }

  getBalance() {
    const amounts = this.transactions.map(getTransactionAmount);
    const total = amounts.reduce(calculateSum).toFixed(2);
    return total;
  }

  getExpenses() {
    const amounts = this.transactions.map(getTransactionAmount);
    const expenses = amounts
      .filter(getLessThanZero)
      .reduce(calculateSum)
      .toFixed(2);
    return expenses;
  }
}
