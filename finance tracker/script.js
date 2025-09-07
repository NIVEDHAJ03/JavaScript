document.addEventListener('DOMContentLoaded', () => {
    const addTransactionBtn = document.getElementById('addTransactionBtn'); 
    const transactionList = document.getElementById('transactionList');
    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpensesEl = document.getElementById('totalExpenses');
    const balanceEl = document.getElementById('balance');

    function displayTransactions() {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactionList.innerHTML = '';

        transactions.forEach((transaction, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${transaction.name} - $${transaction.amount.toFixed(2)} (${transaction.category})
                <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>
            `;

            if (transaction.category === 'income') {
                li.style.backgroundColor = '#0e3a0f';
                li.style.color = 'white';
            } else {
                li.style.backgroundColor = '#705814';
                li.style.color = 'white';
            }

            transactionList.appendChild(li);
        });
    }

    function updateSummary() {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach(transaction => {
            if (transaction.category === 'income') {
                totalIncome += transaction.amount;
            } else {
                totalExpenses += transaction.amount;
            }
        });

        const balance = totalIncome - totalExpenses;
        totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
        totalExpensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
        balanceEl.textContent = `$${balance.toFixed(2)}`;
    }

    function addTransaction() {
        const name = document.getElementById('transactionName').value.trim();
        const amount = parseFloat(document.getElementById('transactionAmount').value);
        const category = document.getElementById('transactionCategory').value;

        if (name && !isNaN(amount)) {
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            const newTransaction = { name, amount, category };
            transactions.push(newTransaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            displayTransactions();
            updateSummary();

            document.getElementById('transactionName').value = '';
            document.getElementById('transactionAmount').value = '';
        }
    }

    function deleteTransaction(index) {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        displayTransactions();
        updateSummary();
    }
    window.deleteTransaction = deleteTransaction;
    addTransactionBtn.addEventListener('click', addTransaction);
    displayTransactions();
    updateSummary();
});
