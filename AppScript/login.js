function doGet(e) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",  // Allow all origins (for testing purposes, use a specific origin in production)
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",  // Allowed methods
      "Access-Control-Allow-Headers": "Content-Type",  // Allowed headers
    };
  
    const sheetId = '1rDgBn1SxitYmjeO7C38lq5DTp0-8loqp9bO1-wuOA4c';  // Replace with your sheet ID
    const ss = SpreadsheetApp.openById(sheetId);
    const usersSheet = ss.getSheetByName("Users");
    
    const usersData = usersSheet.getDataRange().getValues();
    const users = [];
  
    // Start from 1 to skip header row
    for (let i = 1; i < usersData.length; i++) {
      users.push({
        name:usersData[i][0],
        email: usersData[i][1],
        password: usersData[i][2],
        adminEmail:usersData[i][3],
        role: usersData[i][4],
      });
    }
  
    // Create JSON response with users data
    const response = ContentService.createTextOutput(JSON.stringify(users))
      .setMimeType(ContentService.MimeType.JSON);
  
    // Add CORS headers directly to the response
    response.getHeaders = function() {
      return corsHeaders;
    };
  
    return response;
  }
  