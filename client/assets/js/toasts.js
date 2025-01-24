function showToast(message, type = 'success', duration = 6000) {
    // Define the toast type configuration
    // showToast('Login Successful!', 'success');
    // showToast('Invalid email or password.', 'failed');
    // showToast('Please provide all required fields.', 'warning');



    const toastTypes = {
      success: {
        icon: `
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
        `,
        bgColor: 'bg-green-100',
        textColor: 'text-green-500',
      },
      failed: {
        icon: `
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 5a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1Zm0 8a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 10 13Z"/>
          </svg>
        `,
        bgColor: 'bg-red-100',
        textColor: 'text-red-500',
      },
      warning: {
        icon: `
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.516 11.59c.73 1.296-.195 2.911-1.742 2.911H3.483c-1.547 0-2.472-1.615-1.742-2.91L8.257 3.1ZM10 13a1 1 0 1 0 1 1 1 1 0 0 0-1-1Zm0-2a1 1 0 0 0 1-1V7a1 1 0 0 0-2 0v3a1 1 0 0 0 1 1Z"/>
          </svg>
        `,
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-500',
      },
    };
  
    const { icon, bgColor, textColor } = toastTypes[type] || toastTypes.success;
  
    // Create the toast element
    const toast = document.createElement('div');
    toast.innerHTML = `
      <div class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${textColor} ${bgColor} rounded-lg dark:bg-gray-800">
          ${icon}
          <span class="sr-only">${type} icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">${message}</div>
        <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    `;
  
    // Add styling for the toast position
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.zIndex = '1000';
  
    // Append the toast to the body
    document.body.appendChild(toast);
  
    // Close button functionality
    const closeButton = toast.querySelector('button');
    closeButton.addEventListener('click', () => {
      toast.remove();
    });
  
    // Auto-hide the toast after the specified duration
    setTimeout(() => {
      toast.remove();
    }, duration);
  }
  