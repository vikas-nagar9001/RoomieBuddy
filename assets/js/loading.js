function startLoadingButton(delayTime = 200000) {
  var button = document.getElementById('mainButton');
  var buttonText = document.getElementById('buttonText');
  var loader = document.getElementById('loader');

  // Hide the text and show the loader inside the button
  buttonText.classList.add('hidden'); // Hide the "Log in" text
  loader.classList.remove('hidden'); // Show the loader

  // Optionally, disable the button while loading
  button.disabled = true;

  // Simulate a delay (e.g., server request) with the passed delay time
  setTimeout(function () {
    // Restore the button text and enable it after the simulated request
    buttonText.classList.remove('hidden');
    loader.classList.add('hidden'); // Hide the loader
    button.disabled = false;
  }, delayTime);  // Use the passed delayTime instead of a fixed value
}

function stopLoadingButton() {
  var button = document.getElementById('mainButton');
  var buttonText = document.getElementById('buttonText');
  var loader = document.getElementById('loader');

  // Restore the button text and hide the loader
  buttonText.classList.remove('hidden');
  loader.classList.add('hidden');

  // Enable the button again
  button.disabled = false;
}




function startLoading(delayTime = 9999999) {
  // Create a new div element for the loader
  const loaderContainer = document.createElement('div');
  loaderContainer.className = 'loader-container';

  // Set the inner HTML of the loader container
  loaderContainer.innerHTML = `
     <div class="loader-content">
            <h1>
                R
                <svg stroke="currentColor" fill="#8B5CF6" stroke-width="0" viewBox="0 0 24 24" width="1.3em" height="1.3em" height="1.2em"
                    width="1.2em" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z">
                    </path>
                </svg>
                <svg class="animate-bounce" fill="#8B5CF6" width="1.3em" height="1.3em" viewBox="0 0 50 50"
                    xmlns="http://www.w3.org/2000/svg">
                    <path id="Football"
                        d="M66.091,75h-.434a24.926,24.926,0,0,1-8.332-1.544q-.532-.2-1.056-.418c-.229-.1-.456-.2-.682-.3l-.022-.01-.083-.039a25,25,0,0,1-6.2-4.1l-.069-.062-.011-.01q-.446-.405-.876-.835-.448-.448-.872-.916a25.022,25.022,0,0,1-4.1-6.173q-.2-.424-.382-.857-.139-.328-.268-.659a.307.307,0,0,0-.012-.031c-.012-.03-.023-.06-.034-.09a24.851,24.851,0,0,1-1.613-7.569c0-.008,0-.016,0-.024l0-.063c0-.038,0-.076-.006-.114v-.014c-.007-.143-.012-.286-.016-.43Q41,50.369,41,50a24.937,24.937,0,0,1,1.646-8.941.25.25,0,0,0,.009-.023c.008-.02.016-.04.023-.061s.022-.056.033-.084l.014-.035c.077-.2.157-.391.239-.587.037-.087.075-.175.113-.261l.024-.057.023-.052a25.041,25.041,0,0,1,4.434-6.78l.053-.058.018-.019q.337-.366.692-.72.423-.423.861-.822l.058-.053.007-.007a25.043,25.043,0,0,1,6.235-4.128l.069-.032.037-.016q.336-.154.678-.3.4-.167.8-.32A24.907,24.907,0,0,1,65.723,25h.552a24.915,24.915,0,0,1,9.288,1.893l.056.022.021.009.092.039.272.117.013.005.1.046.071.031.042.019a25.031,25.031,0,0,1,6.627,4.358l.01.009.057.051c.254.235.5.475.751.721s.459.468.68.707a25.024,25.024,0,0,1,4.514,6.862l.028.063c.007.016.015.034.022.05.018.04.035.079.052.119,0,0,0,0,0,0,.021.047.041.094.06.14l.045.107.01.023.036.086.025.061a.069.069,0,0,0,0,.01,25.09,25.09,0,0,1,.085,18.676c-.01.027-.021.054-.032.081,0,.01-.009.021-.013.031-.052.13-.106.258-.16.387q-.186.441-.389.873c0,.007-.007.016-.011.022-.014.028-.026.056-.04.083a25.059,25.059,0,0,1-4.089,6.1q-.4.443-.83.869c-.251.251-.506.5-.765.734l-.007.005-.075.069a25.023,25.023,0,0,1-6.594,4.328l-.051.023-.06.027-.114.05h0c-.092.04-.184.08-.276.119l-.1.041A24.911,24.911,0,0,1,66.337,75h-.247Zm-6.853-4.063a22.04,22.04,0,0,0,13.518,0l2.128-6.782L70.485,58H61.515l-4.4,6.156ZM75.169,70A22.1,22.1,0,0,0,82,65.087l-5.263-.078ZM50,65.08A22.093,22.093,0,0,0,56.828,70L55.267,65Zm33.651-1.957A21.886,21.886,0,0,0,88,50c0-.116,0-.232,0-.347l-6.344-4.361-6.836,3.418L72.11,56.833l4.417,6.184ZM44,49.655q0,.173,0,.346a21.881,21.881,0,0,0,4.345,13.112l7.136-.107,4.409-6.173-2.708-8.124L50.356,45.3Zm15.174-1.287L61.721,56h8.558l2.544-7.632L66,43.25ZM44.189,47.113l4.6-3.159-1.775-5.065A21.858,21.858,0,0,0,44.189,47.113Zm39.022-3.165,4.6,3.162a21.842,21.842,0,0,0-2.83-8.222ZM57.894,46.829,65,41.5v-8l-5.869-4.4a22.085,22.085,0,0,0-10.711,7.69l2.254,6.432Zm16.212,0,7.226-3.613,2.249-6.428A22.1,22.1,0,0,0,72.869,29.1L67,33.5v8ZM61.592,28.444,66,31.75l4.409-3.307a22.124,22.124,0,0,0-8.817,0Z"
                        transform="translate(-41 -25)" />
                </svg>
                <span class="ml-1">mie..</span>
            </h1>
        </div>
  `;

  // Append the loader container to the body
  document.body.appendChild(loaderContainer);
  window.loaderContainer = loaderContainer;

  // Automatically remove the loader after delayTime
  setTimeout(() => {
    loaderContainer.remove();
  }, delayTime);
}

// Function to stop the loading indicator
function stopLoading() {
  if (window.loaderContainer) {
    window.loaderContainer.remove(); // Remove the loader
    delete window.loaderContainer; // Clean up
  }
}
// startLoading();