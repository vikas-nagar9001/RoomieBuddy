async function createAccount() {
    // Fetch input fields
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const adminEmailField = document.getElementById("adminEmail");
    const privacyPolicyField = document.getElementById("privacyPolicy");

    // Get input values
    const name = nameField.value;
    const email = emailField.value;
    const password = passwordField.value;
    const adminEmail = adminEmailField.value;
    const privacyPolicyAccepted = privacyPolicyField.checked;
  
    // Validate inputs
    if (!privacyPolicyAccepted) {
      showToast('Please agree to the privacy policy.', 'warning');
      return;
    }
  
    if (!name || !email || !password || !adminEmail) {
      showToast('All fields are required.', 'warning');
      return;
    }
  
    try {
      startLoadingButton();
      // Send the data to Google Apps Script
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxoq9etzmKkLsq62gffcwSHSSx58klcXOZF_R35e-O6fzqlqt-6gJcK0gs5IG6ooN8e/exec", // Replace with your Apps Script URL
        {
          method: "POST",
          body: JSON.stringify({
            action: 'signup',
            name,
            email,
            password,
            adminEmail,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
  
      const result = await response.json();
      if (result.success) {
        showToast(result.message, 'success');

        setTimeout(() => {
          window.location.href = "./login.html";
        }, 3000);
       
      } else {
        // Handle error returned by the server
        showToast(result.message, 'failed');
      }
    } catch (error) {
      console.error("Error during account creation:", error);
      showToast('Failed to create an account. Please try again.', 'failed');
    }
    stopLoadingButton();
  }
  