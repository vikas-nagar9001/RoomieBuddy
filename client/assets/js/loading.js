function startLoadingButton(delayTime) {
    var button = document.getElementById('mainButton');
    var buttonText = document.getElementById('buttonText');
    var loader = document.getElementById('loader');
  
    // Hide the text and show the loader inside the button
    buttonText.classList.add('hidden'); // Hide the "Log in" text
    loader.classList.remove('hidden'); // Show the loader
  
    // Optionally, disable the button while loading
    button.disabled = true;
  
    // Simulate a delay (e.g., server request) with the passed delay time
    setTimeout(function() {
      // Restore the button text and enable it after the simulated request
      buttonText.classList.remove('hidden');
      loader.classList.add('hidden'); // Hide the loader
      button.disabled = false;
    }, delayTime);  // Use the passed delayTime instead of a fixed value
  }
  
  // Example of calling the function with a custom delay time (4000 milliseconds)
//   startLoadingButton(4000);
  
//   // You can call the function like this:
//   document.getElementById('loginButton').addEventListener('click', function(event) {
//     event.preventDefault();
//     startLoading();  // Call the function when the button is clicked
//   });
  