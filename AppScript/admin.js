function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { name, email, password } = data;

    if (!name || !email || !password) {
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
    const adminExists = adminsData.some((row, index) => index > 0 && row[1] === email);
    if (adminExists) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: "Admin Already Exits" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Check if the email already exists in Users Sheet
    const usersData = usersSheet.getDataRange().getValues();
    const userExists = usersData.some((row, index) => index > 0 && row[1] === email);
    if (userExists) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: "You are user of another flat." })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Add user to Users Sheet
    adminsSheet.appendRow([name,email,password])
    usersSheet.appendRow([name, email, password, email,"Admin"]);
    

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Admin created successfully." })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
