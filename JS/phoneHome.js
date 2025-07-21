$(document).ready(function() {
  // Simulate data from the climate module
 /* var climateData = {
      dab: 'DAB 56',
      temperature: '56°C'
  }; */ //this is for hardcoded values to be used.

  // Update the notification bar with data from the climate module
  //this is for hardcoded values to be used.
  //$('#dab-field').text(climateData.dab);
  //$('#temp-field').text(climateData.temperature);

  // Get the current station name from localStorage
  //radio station currently playing will be picked from radioHome.js page and will be used.
  var currentStationName = localStorage.getItem("currentStationName");

  // If there's a station name available, display it in the notification bar
  if (currentStationName) {
      $('#dab-field').text(currentStationName);
  } else {
      $('#dab-field').text('No station playing');
  }

  
  // Handle Radio button click
  $('#radio-button').click(function() {
    window.location.href = 'radioHome.html'; // Redirect to radioHome.html
});
  
  // Add other interactivity for buttons as needed
  // Show the popup when Connect Phone is clicked
// Show the first popup
$('.connect-button').on('click', function () {
    $('#phone-popup').fadeIn();
  });
  
  // Handle No and Close (first popup)
  $('.close-popup, #no-btn').on('click', function () {
    $('#phone-popup').fadeOut();
  });
  
  // When Yes is clicked, hide first popup and show second
  $('#yes-btn').on('click', function () {
    $('#phone-popup').fadeOut(function () {
      $('#pairing-popup').fadeIn();
    });
  });
  
  // Handle Close or Cancel on second popup
  $('.close-pairing, #cancel-pairing').on('click', function () {
    $('#pairing-popup').fadeOut();
  });
  /*---*/
  $('.pair-a-phone-button').on('click', function () {
    console.log('@@@@@ inside third popup');
    $('#confirm-pairing-popup').fadeIn();
  });

  // Handle No and Close (third popup)... no css involved
  $('.close-pairing, #no-btn').on('click', function () {
    console.log('@@@@@ clicked the close button or the no button');
    $('#confirm-pairing-popup').fadeOut();
    console.log('@@@@@ action taken');
  });
  // When Yes is clicked, hide third popup and show fourth...... no css involved
  $('#yes-btn1').on('click', function () {
    $('#confirm-pairing-popup').fadeOut(function(){
      $('#pairing-in-progress').fadeIn();
      /*-fourth and final popup begins--*/
      setTimeout(function() {
  $("#pairing-in-progress").fadeOut(function () {
    // After popup fades out and the phone is connected update the UI
    $('#redial').addClass('active'); // this is to change the color of the button from grey to blue
    console.log("###### after redial");
    $('.phone-button').addClass('active'); //check the css as well
    console.log("###### after phonebook");

    $('#end').addClass('disabled').prop('disabled', true); // this is to disable the button and turn the colour to grey
    $('#mute').addClass('disabled').prop('disabled', true);
    $('#transfer').addClass('disabled').prop('disabled', true);
    $('#join-calls').addClass('disabled').prop('disabled', true);

    // Update text to show phone is connected.. once the phone is connected how should the screen look?
    $('.phone-text').html(
      `<div>
        <p>Phone Ready</p>
        <div class="action-boxes">
          <div class="action-box">Do Not Disturb</div>
          <div class="action-box">Reply with text message</div>
        </div>
      </div>`
    );

    // Optionally hide connect/pair buttons and show others
    $('.connect-button, .pair-a-phone-button').hide();
  });
}, 3000);


    });

  //close the fourth popup on clicking close button
   $('.close-pairing').on('click', function(){
    $('#pairing-in-progress').fadeOut();
   }); 
  });








});
