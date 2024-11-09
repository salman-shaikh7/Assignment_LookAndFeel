const expenses = [];

// Add Expense
document.getElementById('expenseForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  expenses.push({ description, amount, category });
  renderExpenses();
  updateCharts();
});

// Render Expenses Table
function renderExpenses() {
  const tableBody = document.querySelector('#expenseTable tbody');
  tableBody.innerHTML = '';
  expenses.forEach((expense, index) => {
    const row = `<tr>
      <td>${expense.description}</td>
      <td>${expense.amount.toFixed(2)}</td>
      <td>${expense.category}</td>
      <td>
        <button onclick="deleteExpense(${index})">Delete</button>
      </td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

// Delete Expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
  updateCharts();
}

// Charts
function updateCharts() {
  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [{
      label: 'Expenses by Category',
      data: Object.values(categories),
      backgroundColor: ['red', 'blue', 'green', 'orange']
    }]
  };

  new Chart(document.getElementById('expenseChart'), {
    type: 'pie',
    data
  });

  // Similar logic for other charts
}
