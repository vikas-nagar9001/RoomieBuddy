async function createAdminAcc() {
    const nameField = document.getElementById("adminName");
    const emailField = document.getElementById("adminEmail");
    const passwordField = document.getElementById("adminPassword");
    const privacyPolicyField = document.getElementById("privacyPolicy");

    // startLoadingButton(500);

    // Ensure fields exist and are not null
    if (!nameField || !emailField || !passwordField) {
      startLoadingButton(300);
      console.error("One or more fields are missing in the HTML.");
      showToast('Please provide all required fields.', 'warning');
      return;
    }
  
    // Get input values
    const name = nameField.value;
    const email = emailField.value;
    const password = passwordField.value;
    const privacyPolicyAccepted = privacyPolicyField.checked;
  
    // Validate inputs
    if (!privacyPolicyAccepted) {
      startLoadingButton(300);
      showToast('Please agree to the privacy policy.', 'warning');
      return;
    }
  
    if (!name || !email || !password) {
      startLoadingButton(300);
      showToast('All fields are required..', 'warning');
      return;
    }
  
    try {
     startLoadingButton(4000);
      // Send the data to Google Apps Script
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxYaIAp4ohVD3u3mNRDAtgpEpCd_noUpiKUvleU_W4xm3MwldN_FPV8dh9NXhve2bs2/exec", // Replace with your Apps Script URL
        {
          method: "POST",
          body: JSON.stringify({
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
  }
  