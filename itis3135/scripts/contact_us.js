const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent actual reload

  // Show SweetAlert2 popup
  Swal.fire({
    title: 'Message Sent!',
    text: 'Thank you for contacting us. We will get back to you soon.',
    icon: 'success',
    confirmButtonText: 'OK',
    confirmButtonColor: '#4CAF50'
  });

  // Clear the form after showing the popup
  form.reset();
});