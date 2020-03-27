export default class View {
  constructor() {
    this.initView();
  }

  initView() {
    // The root element
    this.app = document.querySelector("#root");

    // The title of the app
    this.title = document.createElement("h2");
    this.title.textContent = "Expense Tracker";
    this.app.append(this.title);

    this.balanceHeading = document.createElement("h4");
    this.balanceHeading.textContent = "Your Balance";
    this.app.append(this.balanceHeading);

    this.balanceAmountHeading = document.createElement("h1");
    this.balanceAmountHeading.id = "balance";
    this.balanceAmountHeading.textContent = "$0.00";
    this.app.append(this.balanceAmountHeading);

    this.incomeExpenseContainer = document.createElement("div");
    this.incomeExpenseContainer.classList.add("inc-exp-container");

    this.incomeDiv = document.createElement("div");

    this.incomeH4 = document.createElement("h4");
    this.incomeH4.textContent = "Income";
    this.incomePara = document.createElement("p");
    this.incomePara.id = "money-plus";
    this.incomePara.classList.add("money", "plus");
    this.incomePara.textContent = "+$0.00";

    this.incomeDiv.append(this.incomeH4, this.incomePara);

    this.incomeExpenseContainer.append(this.incomeDiv);

    this.expenseDiv = document.createElement("div");

    this.expenseH4 = document.createElement("h4");
    this.expenseH4.textContent = "Expense";
    this.expensePara = document.createElement("p");
    this.expensePara.id = "money-minus";
    this.expensePara.classList.add("money", "minus");
    this.expensePara.textContent = "-$0.00";

    this.expenseDiv.append(this.expenseH4, this.expensePara);

    this.incomeExpenseContainer.append(this.expenseDiv);
    this.app.append(this.incomeExpenseContainer);

    this.historyH3 = document.createElement("h3");
    this.historyH3.textContent = "History";
    this.historyList = document.createElement("ul");
    this.historyList.id = "historyList";
    this.historyList.classList.add("list");
    this.app.append(this.historyH3, this.historyList);

    this.newTransactionH3 = document.createElement("h3");
    this.newTransactionH3.textContent = "Add new transaction";
    this.app.append(this.newTransactionH3);
    /*   
      <form id="form">
        <div class="form-control">
          <label for="text">Text</label>
          <input type="text" id="text" placeholder="Enter text" />
        </div>
        <div class="form-control">
          <label for="amount"
            >Amount <br />
            (negative - expense, positive - income )</label
          >
          <input type="number" id="amount" placeholder="Enter amount" />
        </div>
        <button class="btn">Add transaction</button>
      </form>
*/
    this.form = document.createElement("form");
    this.form.id = "form";

    this.transTextDiv = document.createElement("div");
    this.transTextDiv.classList.add("form-control");

    this.transTextLabel = document.createElement("label");
    this.transTextLabel.htmlFor = "text";
    this.transTextLabel.textContent = "Text";

    this.transTextInput = document.createElement("input");
    this.transTextInput.type = "text";
    this.transTextInput.id = "text";
    this.transTextInput.placeholder = "Enter text";

    this.transTextDiv.append(this.transTextLabel, this.transTextInput);

    this.form.append(this.transTextDiv);

    this.transAmountDiv = document.createElement("div");
    this.transAmountDiv.classList.add("form-control");

    this.transAmountLabel = document.createElement("label");
    this.transAmountLabel.htmlFor = "amount";
    this.transAmountLabel.textContent =
      "Amount (negative - expense, positive - income )";

    this.transAmountInput = document.createElement("input");
    this.transAmountInput.type = "number";
    this.transAmountInput.id = "amount";
    this.transAmountInput.placeholder = "Enter amount";

    this.transAmountDiv.append(this.transAmountLabel, this.transAmountInput);

    this.form.append(this.transAmountDiv);

    this.submitButton = document.createElement("button");
    this.submitButton.classList.add("btn");
    this.submitButton.textContent = "Add transaction";

    this.form.append(this.submitButton);

    this.app.append(this.form);
  }

  displayTransactions(transactions) {
    // Delete all nodes
    while (this.historyList.firstChild) {
      this.historyList.removeChild(this.historyList.firstChild);
    }

    if (transactions.length === 0) {
      const noElements = document.createElement("p");
      noElements.textContent = "No transaction, Add a transaction";
      this.historyList.append(noElements);
    } else {
      transactions.forEach(transaction => {
        const listItem = document.createElement("li");
        listItem.id = transaction.id;
        listItem.classList.add(transaction.amount < 0 ? "minus" : "plus");
        listItem.textContent = `${transaction.text}`;

        const span = document.createElement("span");
        span.textContent = `$${transaction.amount}`;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "X";

        listItem.append(span, deleteButton);
        this.historyList.append(listItem);
      });
    }
  }

  updateBalance(balance) {
    this.balanceAmountHeading.textContent = balance;
  }

  updateIncome(income) {
    this.incomePara.textContent = income;
  }

  updateExpenses(expenses) {
    this.expensePara.textContent = expenses;
  }

  // event listener for the submit event on the form
  bindAddTransaction(handler) {
    this.form.addEventListener("submit", event => {
      // alert(event.target);
      event.preventDefault();
      if (this._transText && this._transAmount) {
        handler(this._transText, this._transAmount);
        this._resetTransText();
        this._resetTransAmount();
      }
    });
  }

  // event listener for the delete event on the transaction list
  bindDeleteTransaction(handler) {
    this.historyList.addEventListener("click", event => {
      if (event.target.classList.contains("delete-btn")) {
        const id = parseInt(event.target.parentElement.id);
        handler(id);
      }
    });
  }

  get _transText() {
    return this.transTextInput.value;
  }

  _resetTransText() {
    this.transTextInput.value = "";
  }

  get _transAmount() {
    return this.transAmountInput.value;
  }

  _resetTransAmount() {
    this.transAmountInput.value = "";
  }
}
