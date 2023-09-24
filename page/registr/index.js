function registerUser() {
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const position = document.getElementById('text').value;
  
    // Create a user object with the entered details
    const user = {
      firstName,
      lastName,
      email,
      password,
      phone,
      position
    };
  
    // Store the user data in localStorage
    localStorage.setItem('user', JSON.stringify(user));
  
    // Reset the form
    resetForm();
  
    // Redirect to the account page
    window.location.href = 'file:///C:/Users/Lenovo/Desktop/generation/page/account/accout.html';
  }
  
  function resetForm() {
    // Reset all input fields in the form
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('text').value = '';
  }
  