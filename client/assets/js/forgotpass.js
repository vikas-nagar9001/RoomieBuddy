// Adding event listener to handle form submission
document.getElementById('forgotPasswordForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value; // Get email value
    try {
    
        startLoadingButton(3500);
        // Send the email to the Apps Script web app
        const response = await fetch('https://script.google.com/macros/s/AKfycbzaVF08-GJeNm7rxaI1kAfNEJv7CO3E-mg3NtqAQiPjFLlwTBwYPr16cBfQfqVqOwY3RA/exec', {
            method: 'POST',
            body: JSON.stringify({ email }), // Send email data as JSON
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
