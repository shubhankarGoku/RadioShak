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
});
