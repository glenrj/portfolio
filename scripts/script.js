


$(".hamburger").on("click", function() {

        // $('.nav').toggleClass('hide');

        if ($('.nav').hasClass('hide')) {
            $('.nav').fadeIn(500);
            $('.nav').removeClass('hide')
        } else {
            $('.nav').fadeOut();
            $('.nav').addClass('hide');
        }
    });