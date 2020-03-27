import model from "./Model.js";
import view from "./view.js";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindAddTransaction(this.handleAddTransaction);
    this.view.bindDeleteTransaction(this.handleDeleteTransaction);

    // display initial transactions
    this.onTransactionListChanged(this.model.transactions);

    // update balance, income & expenses
    this.onUdateBalance(this.model.getBalance());
    this.onUpdateIncome(this.model.getIncome());
    this.onUpdateExpenses(this.model.getExpenses());

    this.model.bindTransactionListChanged(this.onTransactionListChanged);
    this.model.bindBalanceChanged(this.onUdateBalance);
    this.model.bindIncomeChanged(this.onUpdateIncome);
    this.model.bindExpensesChanged(this.onUpdateExpenses);
  }

  onTransactionListChanged = transactions => {
    this.view.displayTransactions(transactions);
  };

  handleAddTransaction = (text, amount) => {
    this.model.addTransaction(text, amount);
  };

  handleDeleteTransaction = id => {
    this.model.deleteTransaction(id);
  };

  // updateBalance, updateIncome, updateExpenses
  onUdateBalance = balance => {
    this.view.updateBalance(balance);
  };

  onUpdateIncome = income => {
    this.view.updateIncome(income);
  };

  onUpdateExpenses = expenses => {
    this.view.updateExpenses(expenses);
  };
}
