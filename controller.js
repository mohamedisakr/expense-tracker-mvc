import model from "./Model.js";
import view from "./view.js";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // display initial transactions
    this.onTransactionListChanged(this.model.transactions);

    this.view.bindAddTransaction(this.handleAddTransaction);
    this.view.bindDeleteTransaction(this.handleDeleteTransaction);

    this.model.bindTransactionListChanged(this.onTransactionListChanged);
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
}
