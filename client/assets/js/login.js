const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent form submission

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    showToast('Please provide all required fields.', 'warning');
    return;
  }

  try {
    // Fetch users from Google Sheets using the Apps Script API
    const response = await fetch('https://script.google.com/macros/s/AKfycbw7gAoUbBCVTLnM0fQo6bUDWvPQYM2w6d8AGjoW3JW0BsjDJFypWSttjg78T_PoXvHJ/exec');

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const users = await response.json(); // Assuming the response is an array of users with roles

    // Check if there's a user with the given email and password
    const user = users.find(u => u.email === email && u.password === password);


    if (user) {
      // Store the user's email in sessionStorage
      sessionStorage.setItem('userEmail', user.email);

      // Store the admin's email in sessionStorage (assuming it's available as `user.adminEmail`)
      sessionStorage.setItem('userName', user.name);

      // alert('Login successful!');
      // Show a success toast
      showToast('Login Successfull', 'success');

      setTimeout(() => {
        window.location.href = '../index.html';
      }, 3000);
    } else {
      // Invalid login
      showToast('Invalid email or password.', 'failed');
    }
  } catch (error) {
    console.error('Error:', error);
    showToast('An error occurred while trying to log in.', 'failed');
  }
});
