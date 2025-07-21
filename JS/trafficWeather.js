$(document).ready(function() {
    let currentIndex = 0;
    const items = $('.item');
    const itemList = $('.item-list');
    const scrollBar = $('.scroll-bar');
    const visibleItems = 5; // We are showing 5 items at a time.
    const totalItems = items.length;
    const maxScrollTop = (totalItems - visibleItems) * 40; // Calculate the maximum scrollable top position
    let scrollBarDrag = false;
    let scrollBarStartY;


    function openSettingsPage(){
        window.location.href = 'settingsHome.html';
    }




    // Function to update the selected item
    function updateSelection() {
        items.removeClass('selected');
        $(items[currentIndex]).addClass('selected');
    }

    // Scroll the item list
    function scrollList() {
        const scrollTop = (currentIndex - visibleItems + 1) * 40;
        itemList.scrollTop(Math.max(0, scrollTop));
    }

    // Update the scrollbar position based on selection
    function updateScrollBar() {
        const percentage = currentIndex / (totalItems - 1);
        const scrollBarTop = percentage * maxScrollTop;
        scrollBar.css('top', scrollBarTop + 'px');
    }

    // Scroll down (RKNOB or Arrow Down or Down Arrow Button)
    function scrollDown() {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateSelection();
            scrollList();
            updateScrollBar();
        }
    }

    // Scroll up (LKNOB or Arrow Up or Up Arrow Button)
    function scrollUp() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSelection();
            scrollList();
            updateScrollBar();
        }
    }

    // Handle button clicks
    $('#rk-btn').click(scrollDown);
    $('#lk-btn').click(scrollUp);
    $('#settings-btn').click(openSettingsPage);

    // Handle keyboard arrows
    $(document).keydown(function(e) {
        if (e.key === 'ArrowDown') {
            scrollDown();
        } else if (e.key === 'ArrowUp') {
            scrollUp();
        }
    });

    // Handle scrollbar drag
    scrollBar.mousedown(function(e) {
        scrollBarDrag = true;
        scrollBarStartY = e.pageY;
    });

    $(document).mouseup(function() {
        scrollBarDrag = false;
    });

    $(document).mousemove(function(e) {
        if (scrollBarDrag) {
            const deltaY = e.pageY - scrollBarStartY;
            const percentage = deltaY / maxScrollTop;
            const newCurrentIndex = Math.round(percentage * (totalItems - 1));

            if (newCurrentIndex >= 0 && newCurrentIndex < totalItems) {
                currentIndex = newCurrentIndex;
                updateSelection();
                scrollList();
                updateScrollBar();
            }
        }
    });

    // Handle up and down arrow clicks
    $('.up-arrow').click(scrollUp);
    $('.down-arrow').click(scrollDown);

    // Initialize the first item as selected
    updateSelection();
    updateScrollBar();
});
