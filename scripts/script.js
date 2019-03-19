// nav
$(".navButton").on("click", function() {
        if ($('.nav').hasClass('hide')) {
            $('.nav').removeClass('hide')
        } else {
            $('.nav').addClass('hide');
        }
    });

// $(window).resize(function () {
//     If($(window).width() < 1000){
//         $('.').removeClass('fade');
//     }
// });
