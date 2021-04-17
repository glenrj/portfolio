
// show/hide hamburger nav
$(".navButton").on("click", function() {
        if ($('.nav').hasClass('hide')) {
            $('.nav').removeClass('hide')
        } else {
            $('.nav').addClass('hide');
        }
    });
