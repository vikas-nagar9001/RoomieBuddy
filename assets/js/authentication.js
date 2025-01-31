
// sign up 

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
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    if (!emailRegex.test(email)) {
        showToast('Invalid email address.', 'warning');
        return;
    }

    try {
        startLoadingButton();
        startLoading();
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
    stopLoading();
}



// login 

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
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    if (!emailRegex.test(email)) {
        showToast('Invalid email address.', 'warning');
        return;
    }

    try {
        startLoadingButton();
        startLoading();
        // Send the data to Google Apps Script
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzoo1J1S4Xa2OMm_Tk-KbC40TPIl0d5y7vRTV0sqeG9on5bj4HgnN2fMLO3mj8N9tatdg/exec", // Replace with your Apps Script URL
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
            sessionStorage.setItem('userName', result.userName);
            sessionStorage.setItem('userEmail', result.userEmail);
            sessionStorage.setItem('userPassword', result.userPassword);
            sessionStorage.setItem('adminEmail', result.adminEmail);
            sessionStorage.setItem('role', result.role);

            console.log(result.role);

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
    stopLoading();
});



// admin signup 

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
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    if (!emailRegex.test(email)) {
        showToast('Invalid email address.', 'warning');
        return;
    }

    try {

        startLoadingButton();
        startLoading();
        // Send the data to Google Apps Script
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxoq9etzmKkLsq62gffcwSHSSx58klcXOZF_R35e-O6fzqlqt-6gJcK0gs5IG6ooN8e/exec", // Replace with your Apps Script URL
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
    stopLoading();
}


// forgot pass


// Adding event listener to handle form submission
document.getElementById('forgotPasswordForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value; // Get email value
    try {

        startLoadingButton(3500);
        // Send the email to the Apps Script web app
        const response = await fetch('https://script.google.com/macros/s/AKfycbxoq9etzmKkLsq62gffcwSHSSx58klcXOZF_R35e-O6fzqlqt-6gJcK0gs5IG6ooN8e/exec', {
            method: 'POST',
            body: JSON.stringify({ email, action: 'forgotPassword' }), // Send email data as JSON
        });

        const result = await response.json(); // Parse the response as JSON

        // Handle the response
        if (result.success) {
            showToast(result.message, 'success'); // Display success toast
        } else {
            showToast(result.message, 'failed'); // Display failure toast
        }
    } catch (error) {
        console.error('Error during password recovery:', error);
        showToast('Something went wrong. Please try again later.', 'failed');
    }
});
