document.getElementById('addDonation').addEventListener('click', () => {
  const donor = document.getElementById('donorName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const item = document.getElementById('itemName').value.trim();
  const category = document.getElementById('category').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const date = new Date().toLocaleString();

  // Validate phone
  const phonePattern = /^\d{11}$/;

  if (!donor || !email || !phone || !item || !category || isNaN(quantity) || quantity <= 0) {
    alert("Please fill out all fields correctly.");
    return;
  }

  if (!phonePattern.test(phone)) {
    alert("Phone number must be exactly 11 digits.");
    return;
  }

  const donation = { donor, email, phone, item, category, quantity, date };

  // Save to localStorage (acts as JSON)
  let donations = JSON.parse(localStorage.getItem('donations')) || [];
  donations.push(donation);
  localStorage.setItem('donations', JSON.stringify(donations));

  alert("Donation submitted successfully!");
  document.getElementById('donorName').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('itemName').value = '';
  document.getElementById('quantity').value = '';
});
