//speech to text commands
const speechCommands = [
    'Tune to AM',
    'Tune to FM',
    'Tune to DAB'
];


// JSON Data for DAB, AM, and FM stations - middleware
const dabStations = [
  {
      "country": "America",
      "stationName": "56 The Highway",
      "artistName": "Brad Paisley",
      "songName": "Last Time For Everything",
      "image1": "H:/Python_Projects/uconnect/Project1/images_project/lion.png",
      "image2": "H:/Python_Projects/uconnect/Project1/images_project/lion.png"
  },
  {
      "country": "America",
      "stationName": "45 The Pulse",
      "artistName": "Taylor Swift",
      "songName": "Love Story",
      "image1": "H:/Python_Projects/uconnect/Project1/images_project/Tiger.png",
      "image2": "H:/Python_Projects/uconnect/Project1/images_project/Tiger.png"
  },
  // Additional DAB stations...
];

const amStations = [
  {
      "country": "America",
      "stationName": "1200 AM News",
      "artistName": "News Channel",
      "songName": "Morning News",
      "image1": "H:/Python_Projects/uconnect/Project1/images_project/Gorilla.png",
      "image2": "H:/Python_Projects/uconnect/Project1/images_project/Gorilla.png"
  },
  {
      "country": "America",
      "stationName": "800 AM Sports",
      "artistName": "Sports Channel",
      "songName": "Live Sports",
      "image1": "H:/Python_Projects/uconnect/Project1/images_project/Koala.png",
      "image2": "H:/Python_Projects/uconnect/Project1/images_project/Koala.png"
  },
  // Additional AM stations...
];

const fmStations = [
  {
      "country": "UK",
      "stationName": "101 FM Hits",
      "artistName": "Various Artists",
      "songName": "Top Hits",
      "image1": "H:/Python_Projects/uconnect/Project1/images_project/Cheetah.png",
      "image2": "H:/Python_Projects/uconnect/Project1/images_project/Cheetah.png"
  },
  {
      "country": "UK",
      "stationName": "102 FM Rock",
      "artistName": "Rock Band",
      "songName": "Rock Anthem",
      "image1": "H:/Python_Projects/uconnect/Project1/images_project/Google_Image.png",
      "image2": "H:/Python_Projects/uconnect/Project1/images_project/Google_Image.png"
  },
  // Additional FM stations...
];

let currentStationIndex = 0;
let currentStationList = dabStations; // Start with DAB by default

// Function to update content based on the current index
function updateRadioContent(index) {
  const station = currentStationList[index];
  console.log("@@ 123 inside update Radio content "+station.stationName);
  $('#country').text(station.country);
  $('#station-name').text(station.stationName);
  $('#artist-name').text(station.artistName);
  $('#song-name').text(station.songName);
  $('#image1').attr('src', station.image1);
  $('#image2').attr('src', station.image2);

  // Save the current station name to localStorage so that can be used as a notification in other modules.
  localStorage.setItem("currentStationName", station.stationName);
}



//-----------------------------
// Function to load stations from the last clicked button
//whichever freq is clicked - am / fm/ dab basis that the stations will be aligned to current station list
function loadLastClickedButtonStations() {
    var lastClicked = localStorage.getItem("lastClickedButton");
    if (lastClicked) {
        switch(lastClicked) {
            case 'am':
                currentStationList = amStations;
                break;
            case 'fm':
                currentStationList = fmStations;
                break;
            case 'dab':
                currentStationList = dabStations;
                break;
        }
        currentStationIndex = 0; // Reset station index
        updateRadioContent(currentStationIndex); // Load the corresponding stations
    }
}

//call during Tuner speech to text command
function displayStations(stationList){
    if (stationList && stationList.length > 0) {
        console.log("@@ inside display stations = " + stationList[0].stationName);
        currentStationList = stationList;
        currentStationIndex = 0;
        updateRadioContent(currentStationIndex);
    } else {
        console.error("Station list is empty or undefined");
    } 
}
//-----------***START OF CODE***----------------------------
// Initial load
$(document).ready(function() {
 //---------------------------------------------
 loadLastClickedButtonStations(); // Load the stations for the last clicked button 
 //am / fm/ dab basis that the stations will be aligned to current station list
 
 // Handle AM, FM, and DAB button clicks (updated to store and load last clicked button)

updateRadioContent(currentStationIndex);

$('#fav').click(function() {
    $('#fav-popup').toggle();
});

$('#close-popup').click(function() {
    $('#fav-popup').removeClass('open').hide(); // Close popup and remove red border
});

  // Next and Previous button functionality
  $('#next').click(function() {
      currentStationIndex = (currentStationIndex + 1) % currentStationList.length;
      updateRadioContent(currentStationIndex);
  });

  $('#prev').click(function() {
      currentStationIndex = (currentStationIndex - 1 + currentStationList.length) % currentStationList.length;
      updateRadioContent(currentStationIndex);
  });

  // Handle LKNOB and RKNOB buttons
  $('#lk-btn').click(function() {
    currentStationIndex = (currentStationIndex + 1) % currentStationList.length;
    updateRadioContent(currentStationIndex);
  });  // LKNOB behaves like 'Left Arrow'

  $('#rk-btn').click(function() {
    currentStationIndex = (currentStationIndex + 1) % currentStationList.length;
    updateRadioContent(currentStationIndex);
  });  // RKNOB behaves like 'Right Arrow'


  // Handle AM, FM, and DAB button clicks
  $('button:contains("AM")').click(function() {
      currentStationList = amStations;
      currentStationIndex = 0;
      updateRadioContent(currentStationIndex);
  });

  $('button:contains("FM")').click(function() {
      currentStationList = fmStations;
      currentStationIndex = 0;
      updateRadioContent(currentStationIndex);
  });

  $('button:contains("DAB")').click(function() {
      currentStationList = dabStations;
      currentStationIndex = 0;
      updateRadioContent(currentStationIndex);
  });

  
   // Check if any button was clicked last and stored in localStorage
   var lastClicked = localStorage.getItem("lastClickedButton");
   console.log("Last clicked button on reload: " + lastClicked);

   // If found, add the red border to the corresponding button
   if (lastClicked) {
       $("#" + lastClicked).addClass("selected");
       console.log("Added 'selected' class to: #" + lastClicked); //Confirm if the class is applied
   }

   // Add click event to AM, FM, and DAB buttons
   $("#am, #fm, #dab").on("click", function() {
    console.log("Button clicked: " + this.id); // Check if the correct button ID is logged
       // Remove the red border from all buttons
       $("#am, #fm, #dab").removeClass("selected");

       // Add the red border to the clicked button
       $(this).addClass("selected");

       // Store the ID of the clicked button in localStorage
       localStorage.setItem("lastClickedButton", this.id);
       console.log($(this).attr('class')); // Check if 'selected' class is added
   });

   // Existing functionality to update radio content when AM, FM, or DAB is clicked
   $("#am").click(function() {
       currentStationList = amStations;
       currentStationIndex = 0;
       updateRadioContent(currentStationIndex);
   });

   $("#fm").click(function() {
       currentStationList = fmStations;
       currentStationIndex = 0;
       updateRadioContent(currentStationIndex);
   });

   $("#dab").click(function() {
       currentStationList = dabStations;
       currentStationIndex = 0;
       console.log("***");
       updateRadioContent(currentStationIndex);
   });

//---------------
//Speech to text functionality
$('#speechToTextButton').click(function(){
     // Randomly select one command
     const randomCommand = speechCommands[Math.floor(Math.random() * speechCommands.length)];
     console.log("Random command:", randomCommand);
     // Reset button highlighting
     $('#am, #fm, #dab').removeClass('selected');
     if (randomCommand === 'Tune to AM'){
        $('#am').addClass('selected'); // button selected
        displayStations(amStations); // station selected
     } else if (randomCommand === 'Tune to FM') {
        $('#fm').addClass('selected');
        displayStations(fmStations);
    } else if (randomCommand === 'Tune to DAB') {
        $('#dab').addClass('selected');
        displayStations(dabStations);
    }
    
});

//call the phoneHome page
$('#phone-button').click(function() {
    window.location.href = 'phoneHome.html'; // Redirect to phoneHome.html
});


//call the traffichome page
$('#traffic').click(function() {
    window.location.href = 'trafficWeather.html'; // Redirect to trafficWeather.html
});



});
