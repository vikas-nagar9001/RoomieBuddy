async function createAccount() {
    // Fetch input fields
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const adminEmailField = document.getElementById("adminEmail");
    const privacyPolicyField = document.getElementById("privacyPolicy");

    // startLoadingButton(500);

    // Ensure fields exist and are not null
    if (!nameField || !emailField || !passwordField || !adminEmailField) {
      startLoadingButton(100);
      console.error("One or more fields are missing in the HTML.");

      showToast('Please provide all required fields.', 'warning');
      return;
    }
  
    // Get input values
    const name = nameField.value;
    const email = emailField.value;
    const password = passwordField.value;
    const adminEmail = adminEmailField.value;
    const privacyPolicyAccepted = privacyPolicyField.checked;
  
    // Validate inputs
    if (!privacyPolicyAccepted) {
      startLoadingButton(300);
      showToast('Please agree to the privacy policy.', 'warning');
      return;
    }
  
    if (!name || !email || !password || !adminEmail) {
      startLoadingButton(300);
      showToast('All fields are required..', 'warning');
      return;
    }
  
    try {
     startLoadingButton(4000);
      // Send the data to Google Apps Script
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyUNv2eyo-UVFrecOz1PcGM98D9AgP15vcEG4GBzfmEkfgfF0hgVMuaoUtF7uH2tSU/exec", // Replace with your Apps Script URL
        {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            password,
            adminEmail,
          }),
        }
      );
  
      const result = await response.json();
      if (result.success) {
        showToast('Account create successfull', 'success');

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
  