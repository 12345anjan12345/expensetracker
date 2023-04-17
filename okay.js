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
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('expForm');
const text = document.getElementById('name');
const amount = document.getElementById('amount');
const date= document.getElementById('date');
const form2 = document.getElementById('incForm');
const date2= document.getElementById('date2');
const text2 = document.getElementById('name2');
const amount2 = document.getElementById('amount2');




const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
); 
let today = new Date();
let formattedDate = today.toLocaleDateString('en-CA');
date.value= formattedDate;
date2.value= formattedDate;

let transactions =    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];    //Add transaction
    
function addTransaction(e) {
      e.preventDefault();
      if (text.value.trim() === '' || amount.value.trim() === '') {
          alert('Please add a text and amount');
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

      if (text2.value.trim() === '' || amount2.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction2 = {
            id2: generateID2(),
            text2: text2.value,
            amount2: +amount2.value
            
        };
        transactions.push(transaction2);
        addTransactionDOM(transaction2);
        updateValues2();
        updateLocalStorage2();
        text2.value = '';
        amount2.value = '';
      
    }
  }

  function generateID2() {
    return Math.floor(Math.random() * 100000000);
  }
  // Add transactions to DOM list
  function addTransactionDOM(transaction2) {
    // Get sign
    const sign2 = transaction2.amount < 0 ? '-' : '+';
    const item2 = document.createElement('li');
    // Add class based on value
    item2.classList.add(transaction2.amount2 < 0 ? 'minus' : 'plus');
    item2.innerHTML = `
   <div class="d-flex justify-content-between"> ${transaction2.text} <span>${sign2}${Math.abs(
        transaction2.amount2
    )}</span> <button class="delete-btn text-black" style="background-color:rgb(145, 58, 58); border-radius:10px;"  onclick="removeTransaction(${transaction2.id
        })">Delete</button></div>
  `;
    list.appendChild(item2);
  }

  // Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}
// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
 <div class="d-flex justify-content-between"> ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
  )}</span> <button class="delete-btn text-black" style="background-color:rgb(145, 58, 58); border-radius:10px;"  onclick="removeTransaction(${transaction.id
      })">Delete</button></div>
`;
  list.appendChild(item);
}
function updateValues2() {
    const amounts2 = transactions2.map(transaction2 => transaction2.amount2);
    const total2 = amounts2.reduce((acc, item2) => (acc += item2), 0).toFixed(2);
    const income2 = amounts2
        .filter(item2 => item > 0)
        .reduce((acc2, item2) => (acc2 += item2), 0)
        .toFixed(2);
    const expense2 = (
        amounts2.filter(item2 => item2 < 0).reduce((acc2, item2) => (acc2 += item2), 0) *
        -1
    ).toFixed(2);
    balance.innerText = `Rs ${total2}`;
    money_plus.innerText = `${income2}`;
    money_minus.innerText = `${expense2}`;
  }


// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
      .filter(item => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
  const expense = (
      amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
      -1
  ).toFixed(2);
  balance.innerText = `Rs ${total}`;
  money_plus.innerText = `${income}`;
  money_minus.innerText = `${expense}`;
}

function removeTransaction2(id) {
    transactions = transactions.filter(transaction2 => transaction2.id !== id);
    updateLocalStorage2();
    init();
  }

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage2() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
  updateValues2();
}
init();
form.addEventListener('submit', addTransaction);
form.addEventListener('submit2', addTransaction);
 