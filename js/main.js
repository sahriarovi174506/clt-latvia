(function ($) {
    "use strict";

    // ------- Prealoder ------
    $(window).on("load", function () {
        $("#overlayer").addClass("loading");

        setTimeout(function () {
            $("#overlayer").removeClass("loading");
            $("#overlayer").addClass("loadingEnds");
            $("#overlayer").addClass("loadingRestart");
        }, 3100);

        setTimeout(function () {
            $("#overlayer").removeClass("loadingRestart");
        }, 5100);
    });

    $(document).ready(function () {

        // ------------- About slider --------------

        var slider1 = $('.about_content_slider');
        var slider2 = $('.about_img_slider');

        var slider1FirstSlideIndex; // to determine clone
        var prevIndex = 0; // to determine the direction

        // slider1
        slider1.owlCarousel({
            loop: false,
            margin: 30,
            items: 1,
            nav: true,
            navText: ['<img src="img/slider-up.svg" alt=""/>', '<img src="img/slider-up.svg" alt=""/>'],
            dots: true,
            dotsData: true,
            animateOut: 'slideOutUp',
            animateIn: 'slideInUp',
            mouseDrag: false,
            touchDrag: true,
            onInitialized: function (event) {
                slider1FirstSlideIndex = event.item.index; // to determine clone
            },
            onTranslate: function (event) {
                sliderSync(event);
            }
        });

        function sliderSync(event) {
            var index = event.item.index;
            var loop = event.relatedTarget.options.loop;
            var slider2CloneCount = slider2.find('.owl-item.cloned').length / 2;

            if (loop) {
                if (index < slider1FirstSlideIndex) { // if active slide is clone
                    slider2.trigger('prev.owl.carousel');
                } else {
                    if (event.item.count === 2 && event.item.index === 2 && prevIndex === 3) { // if two slides and trigger = next
                        slider2.trigger('next.owl.carousel');
                    } else {
                        slider2.trigger('to.owl.carousel', index - slider2CloneCount);
                    }
                }

                prevIndex = event.item.index; // to determine the direction

            } else {
                slider2.trigger('to.owl.carousel', index);
            }
        }

        // slider2
        slider2.owlCarousel({
            loop: true,
            margin: 30,
            items: 1,
            nav: false,
            dots: false,
            mouseDrag: false,
            touchDrag: false,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
        });




        // ------------ advantages carousel ------------------

        $(".advantages_carousel").owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            navText: ['<img src="img/slider-left-angle.png" alt=""/>', '<img src="img/slider-right-angle.png" alt=""/>'],
            dots: false,
        });



        // smooth scroll
        $('a').click(function (e) {
            e.preventDefault();
            var target = $($(this).attr('href'));
            if (target.length) {
                var scrollTo = target.offset().top;
                $('body, html').animate({ scrollTop: scrollTo + 'px' }, 800);
            }
        });


        // Toggle Menu
        $('.menu_toggler').click(function (e) {
            $('.site_header').toggleClass("toggled");
            $('main').toggleClass("dec_zindex");
        });



        $(".advantages_section .owl-nav button.owl-next").hover(
            function () {
                $(".advantages_section .owl-nav button.owl-prev").css({
                    'transform': 'translateX(-8rem)',
                    'opacity': 0
                });
            },
            function () {
                // Reset styles when not hovering
                $(".advantages_section .owl-nav button.owl-prev").css({
                    'transform': 'none',
                    'opacity': 1
                });
            }
        );

    });



})(jQuery);