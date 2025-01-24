async function createAdminAcc() {
    const nameField = document.getElementById("adminName");
    const emailField = document.getElementById("adminEmail");
    const passwordField = document.getElementById("adminPassword");
    const privacyPolicyField = document.getElementById("privacyPolicy");

    // Get input values
    const name = nameField.value;
    const email = emailField.value;
    const password = passwordField.value;
    const privacyPolicyAccepted = privacyPolicyField.checked;
  
    // Validate inputs
    if (!privacyPolicyAccepted) {
      showToast('Please agree to the privacy policy.', 'warning');
      return;
    }
  
    if (!name || !email || !password) {
      showToast('All fields are required..admin', 'warning');
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
            action: 'adminSignup',
            name,
            email,
            password,
          }),
        }
      );
  
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
  