$(document).ready(function() {
    function updateTime() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        // Add leading zero to minutes and hours if needed
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        // Display the time in HH:MM format
        $('#time').text(hours + ':' + minutes);
    }

    // Update time every second
    setInterval(updateTime, 1000);

    // Call the function initially to display time immediately
    updateTime();
//---------------------------
    const temperatureData = {
        "temperatures": [
            { "city": "New York", "temperature": 68 },
            { "city": "Los Angeles", "temperature": 75 },
            { "city": "Chicago", "temperature": 55 },
            { "city": "Houston", "temperature": 82 }
        ]
    };
// show temperature - json indicates value from middleware team.
    let currentIndex = 0;
    function showTemperature() {
        const tempObj = temperatureData.temperatures[currentIndex];
        const htmlContent = `<div id="temp">${tempObj.city}: ${tempObj.temperature}°F</div>`;
        $('#temp').html(htmlContent);

        // Move to the next index, and loop back if at the end
        currentIndex = (currentIndex + 1) % temperatureData.temperatures.length;
    }

    // Initially show the first temperature
    showTemperature();

    // Change temperature every 3 seconds
    setInterval(showTemperature, 3000);
});
