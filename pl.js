// function incomeform(event) {
//     event.preventDefault();
  
//     let incomeamount = document.getElementById("inamount").value;
//     let text;
//     if (isNaN(incomamount) || incomeamount < 1) {
//       text ="Amount is not valid";
//     } else {
//       text = "Input OK";
//     }
//     document.getElementById("expamount").innerHTML = text; //Income Amount
//   }


// let today = new Date();
// let formattedDate2 = today.toLocaleDateString('en-CA');
// document.getElementById("date").value = formattedDate2; //Adding current date as default date in expense


const balance = document.getElementById('balance');
const money = document.getElementById('money');
const list = document.getElementById('list');
const form = document.getElementById('expForm');
const text = document.getElementById('name');
const amount = document.getElementById('amount');
const date= document.getElementById('date');




const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
); 
let today = new Date();
let formattedDate = today.toLocaleDateString('en-CA');
date.value= formattedDate;

let transactions =    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];    //Add transaction

function addTransaction(e) {
      e.preventDefault();
      if (text.value.trim() === '' || amount.value.trim() === '') {
          alert('Please add a text and amount');
      } 
      else if (!/^\d+(\.\d{1,2})?$/.test(amount.value)) {
        alert('Please enter a valid amount');
      
      } else {
          const transaction = {
              id: generateID(),
              text: text.value,
              amount: +amount.value
              
          };
          transactions.push(transaction);
          addTransactionDOM(transaction);
          updateValues();
          updateLocalStorage();
          text.value = '';
          amount.value = '';
        
      }
  }
  // Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}
// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = '+';
  const item = document.createElement('li');
  // Add class based on value
  item.classList.add('plus');
  item.innerHTML = `
 <div class="d-flex justify-content-between"><div> ${transaction.text}</div> <div style="
 position: absolute;
 margin-left: 30%;
">${sign}${Math.abs(
      transaction.amount
  )}</div> <div><button class="delete-btn text-black" style="background-color:rgb(145, 58, 58); border-radius:10px;"  onclick="removeTransaction(${transaction.id
      })">Delete</button></div></div>
`;
  list.appendChild(item);
}
// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  // const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const expense = amounts
      .filter(item => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
  // balance.innerText = `Rs ${total}`;
  money.innerText = `${expense}`;
}
// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}
// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}
init();
form.addEventListener('submit', addTransaction);

