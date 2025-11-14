// Redirect to login if not authenticated
if (sessionStorage.getItem('loggedIn') !== 'true') {
  window.location.href = 'login.html';
}

const tableBody = document.querySelector('#donationTable tbody');
let donations = JSON.parse(localStorage.getItem('donations')) || [];
let filteredDonations = [...donations];

// Renders donation rows
function renderDonations(list = donations) {
  tableBody.innerHTML = '';

  list.forEach((donation, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${donation.donor}</td>
      <td>${donation.email}</td>
      <td>${donation.phone}</td>
      <td>${donation.item}</td>
      <td>${donation.category}</td>
      <td>${donation.quantity}</td>
      <td>${donation.date}</td>
      <td>
        <button class="editBtn" data-index="${index}">Edit</button>
        <button class="deleteBtn" data-index="${index}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  addActionEvents();
}

// Save donations
function saveDonations() {
  localStorage.setItem('donations', JSON.stringify(donations));
}

// Add edit/delete event listeners
function addActionEvents() {
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      const donation = donations[index];

      const confirmed = confirm(`Are you sure you want to delete this donation from "${donation.donor}"?`);
      if (confirmed) {
        donations.splice(index, 1);
        saveDonations();
        alert("Donation deleted successfully!");
        renderDonations();
      }
    });
  });

  document.querySelectorAll('.editBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      const donation = donations[index];

      const newDonor = prompt("Edit Donor Name:", donation.donor);
      const newEmail = prompt("Edit Email:", donation.email);
      const newPhone = prompt("Edit Phone (11 digits):", donation.phone);
      const newItem = prompt("Edit Item:", donation.item);
      const newCategory = prompt("Edit Category (Food/Clothes/Funds):", donation.category);
      const newQuantity = prompt("Edit Quantity:", donation.quantity);

      if ([newDonor,newEmail,newPhone,newItem,newCategory,newQuantity].includes(null)) {
        alert("Edit cancelled.");
        return;
      }

      if (!/^\d{11}$/.test(newPhone)) {
        alert("Phone must be 11 digits. Edit cancelled.");
        return;
      }

      if (newDonor && newEmail && newPhone && newItem && newCategory && newQuantity && !isNaN(newQuantity)) {
        donations[index] = {
          donor: newDonor,
          email: newEmail,
          phone: newPhone,
          item: newItem,
          category: newCategory,
          quantity: parseInt(newQuantity),
          date: new Date().toLocaleString()
        };
        saveDonations();
        alert("Donation updated successfully!");
        renderDonations();
      } else {
        alert("Invalid input, edit cancelled.");
      }
    });
  });
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('loggedIn');
  window.location.href = 'login.html';
});

// Search by category
document.getElementById('searchBtn').addEventListener('click', () => {
  const searchTerm = document.getElementById('searchCategory').value.trim().toLowerCase();
  if (!searchTerm) {
    alert("Enter a category to search.");
    return;
  }

  filteredDonations = donations.filter(d => d.category.toLowerCase() === searchTerm);
  renderDonations(filteredDonations);
});

// Reset search
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('searchCategory').value = '';
  renderDonations(donations);
});

// Initial render
renderDonations();
