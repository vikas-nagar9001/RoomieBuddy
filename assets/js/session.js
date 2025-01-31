// session.js

// Function to check if the session exists
function checkSession() {
    const userEmail = sessionStorage.getItem('userEmail');
    const adminEmail = sessionStorage.getItem('adminEmail');
  
    // If no session exists, redirect to login page
    if (!userEmail || !adminEmail) {
     // alert('You must log in first.');
      window.location.href = 'pages/login.html'; // Redirect to the login page
    }
  }
  
  
  // Function to log out
  function logout(path='pages/login.html') {
    // Clear the session and redirect to login page
    sessionStorage.clear();
    alert('You have been logged out.');
    window.location.href ='pages/login.html';
  }
  

  // get back session data and use in html by id
//   <p>User Email: <span id="userEmail"></span></p>
//   <script> const userEmail = sessionStorage.getItem('userEmail');
//     document.getElementById('userEmail').textContent = userEmail;</script>

  // Call checkSession() when the script loads to restrict access to protected pages
  checkSession();
  

