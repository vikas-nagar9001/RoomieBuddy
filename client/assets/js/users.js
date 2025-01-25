function changeRole(button) {
  // Retrieve email and role dynamically
  const email = button.getAttribute('data-email');
  const role = button.getAttribute('data-role');

  console.log(`Changing role for ${email} to ${role}`);

  // Perform an AJAX request
  fetch('/change-role', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, role: role }),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Failed to change role');
      return response.json();
    })
    .then((data) => console.log('Role changed successfully:', data))
    .catch((error) => console.error('Error:', error));
}


// Admin Page Add USer Form data

async function addUser() {
  // Fetch input fields
  const nameField = document.getElementById("newUserName");
  const emailField = document.getElementById("newUserEmail");
  const messageField = document.getElementById("newUserMessage");

  // Get input values
  const name = nameField.value;
  const email = emailField.value;
  const message = messageField.value;
 

  if (!name || !email || !message) {
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
          action: 'addUser',
          name,
          email,
          message,
          adminEmail:'admin@gmail.com',
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
        window.location.href = "#";
      }, 3000);
     
    } else {
      // Handle error returned by the server
      showToast(result.message, 'failed');
    }
  } catch (error) {
    console.error("Error during adding user:", error);
    showToast('Failed to add user. Please try again.', 'failed');
  }
  stopLoadingButton();
}
