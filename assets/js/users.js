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
  // const adminEmail = sessionStorage.getItem('adminEmail');


  if (!name || !email || !message) {
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
    startLoading();
   const adminEmail = sessionStorage.getItem('adminEmail'); 
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
          adminEmail: adminEmail,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to add users');
    }

    const result = await response.json();
    if (result.success) {
      showToast(result.message, 'success');

      setTimeout(() => {
        window.location.reload(); // This will refresh the page
      }, 3000);

    } else {
      // Handle error returned by the server
      showToast(result.message, 'failed');
    }
  } catch (error) {
    console.error("Error during adding user:", error);
    showToast('Failed to add user. Please try again.', 'failed');
  }
  stopLoading();
}





async function adminUsersData() {
  startLoading();

  const adminEmail =sessionStorage.getItem('adminEmail'); 
  // Set up the query parameters
  const params = new URLSearchParams({
    adminEmail: adminEmail,
    action: "adminUsersData" // Set the admin email as the query parameter
  });

  try {
    // Fetch the data from the Google Apps Script
    const response = await fetch(
      `https://script.google.com/macros/s/AKfycbzoo1J1S4Xa2OMm_Tk-KbC40TPIl0d5y7vRTV0sqeG9on5bj4HgnN2fMLO3mj8N9tatdg/exec?${params}`, // Append the query string
      {
        method: "GET",
      }
    );
    console.log("s");

    const data = await response.json();

    // Check if the request was successful
    if (data.success) {
      const users = data.users; // Array of users

      // Get the tbody element to insert rows into
      const tbody = document.querySelector("tbody");

      // Clear the existing rows (if any)
      tbody.innerHTML = "";

      // Loop through the users and create table rows
      users.forEach((user) => {
        // Create a new table row
        const row = document.createElement("tr");
        row.classList.add("text-gray-700", "dark:text-gray-400"); // Apply the class to the row

        // Insert the user data into the row
        row.innerHTML = `

                  <td class="px-4 py-3">
                    <div class="flex items-center text-sm">
                      <!-- Avatar with inset shadow -->
                      <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img class="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt="" loading="lazy" />
                        <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                      </div>
                      <div>
                        <p class="font-semibold">${user.name}</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                        ${user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="px-4 py-3 text-sm">
                  ${user.password}
                  </td>


                 <td class="px-4 py-3 text-xs">
                    <!-- Toggle Switch -->
                    <div class="flex items-center">
                      <div class="flex bg-purple-300 rounded-full p-0.5">
                      ${user.role === 'Admin' ? `
                          <button 
                            class="toggle-btn px-3 py-1 text-xs font-semibold text-white bg-purple-600 rounded-full transition-all duration-300 focus:outline-none">
                            Admin
                          </button>
                           <button 
                            class="toggle-btn px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-300 rounded-full transition-all duration-300 focus:outline-none">
                            User
                          </button>
                        ` : `
                          <button 
                            class="toggle-btn px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-300 rounded-full transition-all duration-300 focus:outline-none">
                            Admin
                          </button>
                            <button 
                            class="toggle-btn px-3 py-1 text-xs font-semibold text-white bg-purple-600 rounded-full transition-all duration-300 focus:outline-none">
                            User
                          </button>
                        `}
                        
                      </div>
                    </div>

                  </td>

                  <td class="px-4 py-3 text-sm">
                    6/10/2020
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center space-x-4 text-sm">
                      <button
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit">
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                          </path>
                        </svg>
                      </button>
                      <button
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete">
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
               
      `;

        // Append the new row to the table body
        tbody.appendChild(row);
      });
    } else {
      // Handle error if no users are found
      console.log(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    showToast('An error while fetching data', 'failed');
  }
  stopLoading();
}
