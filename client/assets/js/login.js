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
    startLoadingButton();
    // Send the data to Google Apps Script
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbx-vO44873Z67cUgLt_RtN2AzW7n142EZ1oewhVeJcAQyMOMWVXp9pTU1y62aLGM5gV0Q/exec", // Replace with your Apps Script URL
      {
        method: "POST",
        body: JSON.stringify({
          action: 'login',
          email,
          password,
        }),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    if (result.success) {
      // Store the user's email in sessionStorage
      sessionStorage.setItem('userEmail', email);


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
  stopLoadingButton();
});
