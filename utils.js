export function generateId() {
  return Math.floor(Math.random() * 100000000);
}

// *********************************** callback functions ***************************************** */

export function getTransactionAmount(transaction) {
  return transaction.amount;
}

export function calculateSum(acc, item) {
  return (acc += item);
}

export function getGreaterThanZero(item) {
  return item > 0;
}

export function getLessThanZero(item) {
  return item < 0;
}

// *********************************** end of callback functions ***************************************** */
