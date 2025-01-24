function doPost(e) {
    try {
      const data = JSON.parse(e.postData.contents);
      const { name, email, password, adminEmail } = data;
  
      if (!name || !email || !password || !adminEmail) {
        return ContentService.createTextOutput(
          JSON.stringify({ success: false, message: "Missing fields." })
        ).setMimeType(ContentService.MimeType.JSON);
      }
  
      const sheetId = '1rDgBn1SxitYmjeO7C38lq5DTp0-8loqp9bO1-wuOA4c';
      const ss = SpreadsheetApp.openById(sheetId);
  
      const usersSheet = ss.getSheetByName("Users");
      const adminsSheet = ss.getSheetByName("Admins");
  
      // Check if the adminEmail exists in Admins Sheet
      const adminsData = adminsSheet.getDataRange().getValues();
      const adminExists = adminsData.some((row, index) => index > 0 && row[1] === adminEmail);
      if (!adminExists) {
        return ContentService.createTextOutput(
          JSON.stringify({ success: false, message: "No admin found." })
        ).setMimeType(ContentService.MimeType.JSON);
      }
  
      // Check if the email already exists in Users Sheet
      const usersData = usersSheet.getDataRange().getValues();
      const userExists = usersData.some((row, index) => index > 0 && row[1] === email);
      if (userExists) {
        return ContentService.createTextOutput(
          JSON.stringify({ success: false, message: "User already exists." })
        ).setMimeType(ContentService.MimeType.JSON);
      }
  
      // Add user to Users Sheet.
      usersSheet.appendRow([name, email, password, adminEmail,"User"]);
  
      // Update the admin's Users column in Admins Sheet
      for (let i = 1; i < adminsData.length; i++) {
        if (adminsData[i][1] === adminEmail) { // Check if the admin email matches
          const currentUsers = adminsData[i][3] || ""; // Get existing users in the "Users" column
          const newEntry = `${name} <${email}>`;
  
          // Avoid adding duplicate user entries
          if (!currentUsers.includes(newEntry)) {
            const updatedUsers = currentUsers
              ? `${currentUsers}, ${newEntry}` // Append user if there are existing users
              : newEntry; // Add the first user if empty
  
            // Update the "Users" column (Column D) for the matched admin
            adminsSheet.getRange(i + 1, 4).setValue(updatedUsers);
          }
          break;
        }
      }
  
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, message: "Account created successfully." })
      ).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: error.message })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }
  