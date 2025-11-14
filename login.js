document.getElementById('loginBtn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === "Admin" && password === "Admin123") {
    sessionStorage.setItem('loggedIn', 'true');
    window.location.href = "admin.html";
  } else {
    document.getElementById('errorMsg').textContent = "Invalid credentials!";
  }
});
