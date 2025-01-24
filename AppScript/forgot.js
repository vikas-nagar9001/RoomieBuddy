function doPost(e) {
    try {
      // Parse the incoming request
      const requestData = JSON.parse(e.postData.contents);
  
      if (!requestData.email) {
        // Validate email input
        return ContentService.createTextOutput(
          JSON.stringify({ success: false, message: "Email is required." })
        ).setMimeType(ContentService.MimeType.JSON);
      }
  
      const email = requestData.email.trim().toLowerCase(); // Normalize email for comparison
  
      // Provide your Google Sheet ID here
      const sheetId = "1rDgBn1SxitYmjeO7C38lq5DTp0-8loqp9bO1-wuOA4c"; // Replace with your actual Sheet ID
      const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Users');
      const data = sheet.getDataRange().getValues();
  
      // Find the row with the matching email
      for (let i = 1; i < data.length; i++) {
        if (data[i][1].toLowerCase() === email) { // Assuming column 2 has the email
          const password = data[i][2]; // Assuming column 3 has the password
  
          // Send an email with the password
          GmailApp.sendEmail(email, 'Your Password', `Your password is: ${password}`);
          return ContentService.createTextOutput(
            JSON.stringify({ success: true, message: "Password sent successfully to your email." })
          ).setMimeType(ContentService.MimeType.JSON);
        }
      }
  
      // If no match is found
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: "Email not found." })
      ).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      // Catch and return errors as JSON
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: "Error: " + error.message })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }
  