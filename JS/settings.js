$(document).ready(function() {
    // Initialize the first item as active
    let currentIndex = 0;
    const menuItems = $('.menu-item');
    
    // Add active class to the first item
    $(menuItems[currentIndex]).addClass('active');
    
    // Left Scroll Knob (scroll up)
    $('#left-knob').click(function() {
        $(menuItems[currentIndex]).removeClass('active');
        currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        $(menuItems[currentIndex]).addClass('active');
    });

    // Right Scroll Knob (scroll down)
    $('#right-knob').click(function() {
        $(menuItems[currentIndex]).removeClass('active');
        currentIndex = (currentIndex + 1) % menuItems.length;
        $(menuItems[currentIndex]).addClass('active');
    });
});
