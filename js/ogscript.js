(function(){
    var thisCard;

    $(document).on('click', '.card', cardClick);

    function closePopup() {
        $('.arrow-up-animate').removeClass('arrow-up-animate');
        $(".bio-content").fadeOut('fast');

        $(document).off('click', 'span.close', closePopup);

        $('.popup').animate({
            height: '0'
        }, 300);

        setTimeout(function() {
            thisCard.children('h2, .disciplines').show();
            thisCard.addClass('nojQuery');
            thisCard.css('height', '');
            $('.popup').remove();
        }, 400);
    }

    function changeCardPosition() {
        $grid.isotope('on', 'arrangeComplete', function (isoInstance, laidOutItems) {
            setTimeout(function () {
              $(".cohort-logo, .card, .popup").css({"position" : "relative", "top" : "0", "left" : "0"});
            }, 1);
        });
    }

function cardClick() {
    $('.popup').remove();

    var cardId = $(this).attr('id');
    thisCard = $('#' + cardId);

    var topPos = thisCard.offset().top - $('main section').offset().top;
    var popHeight = thisCard.height();
    var margin = parseFloat(thisCard.css('margin-top'));
    var leftPos = thisCard.position().left;
    var popDownPos = margin + margin + popHeight;
    var popDownHeight = popDownPos + popHeight;
    var scrollTopPos = thisCard.offset().top - 55 - margin;
    var popupArrow = leftPos + (thisCard.height()/2.4);

    if ( $(window).width() <= 885 && $(window).width() > 550 || $(window).width() < 480) {
        $.ajax({
        url: "json/main.json",
        async: false,
        success: function(data) {
            console.log('data', data);
            for (var cohort in data.cohorts) {
                for (var student in data.cohorts[cohort].students) {
                    if (cardId == data.cohorts[cohort].students[student].id) {
                        var cohortGroup = data.cohorts[cohort];
                        var studentCard = cohortGroup.students[student];
                        $(thisCard).append("<div class='popup'><div class='arrow-up'></div><img src='"+ studentCard.headshot + "' alt='' class='img-pop'><div class='bio-container'><div class='bio-content'><h2>"+ studentCard.name + "</h2><h3>Graduated " + cohortGroup.year + "</h3><h4><span class='student-skills'></span><br><span class='student-location'></span><br>" + capitalizeFirstLetter(cohortGroup.cohort) + " Cohort</h4><p class='bio'>" + studentCard.bio + "</p><p><a class='student-portfolio' target='_blank' href='http://www." + studentCard.portfolio + "'><span>Portfolio</span><i class='fa fa-briefcase'></i></a><a class='student-twitter' target='_blank' href='http://www.twitter.com/" + studentCard.twitter + "'><span>Twitter</span><i class='fa fa-twitter'></i></a><a class='student-linkedin' target='_blank' href='http://www." + studentCard.linkedin + "'><span>LinkedIn</span><i class='fa fa-linkedin'></i></a></p></div><span class='close'>&plus;</span></div></div>");
                        for (var skill in data.cohorts[cohort].students[student].skills) {
                            var studentSkill = studentCard.skills[skill];

                            if (studentCard.skills.length > 1) {
                                if (studentSkill == studentCard.skills[studentCard.skills.length - 1]) {
                                    $(".popup h4 .student-skills").append(studentSkill.toUpperCase());
                                }
                                else {
                                    $(".popup h4 .student-skills").append(studentSkill.toUpperCase() + " / ");
                                }

                            } else {
                                 if (studentSkill == 'ux') {
                                    $(".popup h4 .student-skills").append("User Experience Design");
                                }
                                else if (studentSkill == "ui") {
                                    $(".popup h4 .student-skills").append("User Interface Design");

                                }
                                else if (studentSkill == "dev") {
                                    $(".popup h4 .student-skills").append("Front-end Development");

                                }
                            }
                    }
                        for (var loc in data.cohorts[cohort].students[student].location) {
                            var studentLoc = studentCard.location[loc];
                            if (studentLoc == studentCard.location[studentCard.location.length - 1]) {
                                $(".popup h4 .student-location").append(studentLoc);
                            } else {
                            $(".popup h4 .student-location").append(studentLoc + " / ");
                            }
                        }

                        if (studentCard.twitter == "N/A") {
                            $('.student-twitter').hide();
                        }
                        if (studentCard.linkedin == "N/A") {
                            $('.student-linkedin').hide();
                        }
                        if (studentCard.portfolio == "N/A") {
                            $('.student-portfolio').hide();
                        }
                    }

                }
            }
        }
    });
        changeCardPosition();

        topPos = thisCard.position().top;
        thisCard.removeClass('nojQuery');

        $('body').animate({
            scrollTop: scrollTopPos
        }, 300);

        $('.img-pop')
            .css('left', leftPos)
            .css('top', -popDownPos);

        $('.popup')
            .css('top', popDownPos)
            .css('left', -leftPos)
            .css('right', 0)
            .css('height', popHeight)
            .css('width', $('main section').width() * 0.98)
            .addClass('popup-animate');

        $('.arrow-up').css('left', popupArrow);
        setTimeout(function() {
            $('.arrow-up').addClass('arrow-up-animate');
        }, 300);

        thisCard.css('height', popDownHeight);
        thisCard.children('h2, .disciplines').hide();

        $('.bio-content').fadeIn('fast');

        $(document).off('click', '.card', cardClick);

    } else if ( $(window).width() <= 550 ) {
        $.ajax({
        url: "json/main.json",
        async: false,
        success: function(data) {
            console.log('data', data);
            for (var cohort in data.cohorts) {
                for (var student in data.cohorts[cohort].students) {
                    if (cardId == data.cohorts[cohort].students[student].id) {
                        var cohortGroup = data.cohorts[cohort];
                        var studentCard = cohortGroup.students[student];
                        $(thisCard).append("<div class='popup'><div class='arrow-up'></div><img src='"+ studentCard.headshot + "' alt='' class='img-pop'><div class='bio-container'><div class='bio-content'><h2>"+ studentCard.name + "</h2><h3>Graduated " + cohortGroup.year + "</h3><h4><span class='student-skills'></span><br><span class='student-location'></span><br>" + capitalizeFirstLetter(cohortGroup.cohort) + " Cohort</h4><p class='bio'>" + studentCard.bio + "</p><p><a class='student-portfolio' target='_blank' href='http://www." + studentCard.portfolio + "'><span>Portfolio</span><i class='fa fa-briefcase'></i></a><a class='student-twitter' target='_blank' href='http://www.twitter.com/" + studentCard.twitter + "'><span>Twitter</span><i class='fa fa-twitter'></i></a><a class='student-linkedin' target='_blank' href='http://www." + studentCard.linkedin + "'><span>LinkedIn</span><i class='fa fa-linkedin'></i></a></p></div><span class='close'>&plus;</span></div></div>");
                        for (var skill in data.cohorts[cohort].students[student].skills) {
                            var studentSkill = studentCard.skills[skill];

                            if (studentCard.skills.length > 1) {
                                if (studentSkill == studentCard.skills[studentCard.skills.length - 1]) {
                                    $(".popup h4 .student-skills").append(studentSkill.toUpperCase());
                                }
                                else {
                                    $(".popup h4 .student-skills").append(studentSkill.toUpperCase() + " / ");
                                }

                            } else {
                                 if (studentSkill == 'ux') {
                                    $(".popup h4 .student-skills").append("User Experience Design");
                                }
                                else if (studentSkill == "ui") {
                                    $(".popup h4 .student-skills").append("User Interface Design");

                                }
                                else if (studentSkill == "dev") {
                                    $(".popup h4 .student-skills").append("Front-end Development");

                                }
                            }
                    }
                        for (var loc in data.cohorts[cohort].students[student].location) {
                            var studentLoc = studentCard.location[loc];
                            if (studentLoc == studentCard.location[studentCard.location.length - 1]) {
                                $(".popup h4 .student-location").append(studentLoc);
                            } else {
                            $(".popup h4 .student-location").append(studentLoc + " / ");
                            }
                        }

                        if (studentCard.twitter == "N/A") {
                            $('.student-twitter').hide();
                        }
                        if (studentCard.linkedin == "N/A") {
                            $('.student-linkedin').hide();
                        }
                        if (studentCard.portfolio == "N/A") {
                            $('.student-portfolio').hide();
                        }
                    }

                }
            }
        }
    });
        changePosition();

        topPos = thisCard.position().top;
        thisCard.removeClass('nojQuery');

        $('body').animate({
            scrollTop: scrollTopPos
        }, 300);

        $('.img-pop')
            .css('left', leftPos)
            .css('top', -popDownPos);

        $('.popup')
            .css('top', popDownPos)
            .css('left', -leftPos)
            .css('right', 0)
            .css('height', popHeight + popHeight)
            .css('width', $('main section').width() * 0.98)
            .addClass('popup-animate');

        $('.arrow-up').css('left', popupArrow);
        setTimeout(function() {
            $('.arrow-up').addClass('arrow-up-animate');
        }, 300);

        thisCard.css('height', popDownHeight + popHeight);
        thisCard.children('h2, .disciplines').hide();

        $('.bio-content').fadeIn('fast');

        $(document).off('click', '.card', cardClick);

    } else {
        $.ajax({
        url: "json/main.json",
        async: false,
        success: function(data) {
            var studentCard = _.compact(_.map(data.cohorts, function (cohort) {
                return _.findWhere(cohort.students, { id: cardId });
            }))[0];

            var cohortGroup = _.filter(data.cohorts, function (cohort) {
                return studentCard.cohort === cohort.cohort;
            })[0];

            $('main section').append("<div class='popup'><img src='"+ studentCard.headshot + "' alt='' class='img-pop'><div class='bio-container'><div class='bio-content'><h2>"+ studentCard.name + "</h2><h3>Graduated " + cohortGroup.year + "</h3><h4><span class='student-skills'></span><br><span class='student-location'></span><br>" + capitalizeFirstLetter(cohortGroup.cohort) + " Cohort</h4><p class='bio'>" + studentCard.bio + "</p><p><a class='student-portfolio' target='_blank' href='http://www." + studentCard.portfolio + "'><span>Portfolio</span><i class='fa fa-briefcase'></i></a><a class='student-twitter' target='_blank' href='http://www.twitter.com/" + studentCard.twitter + "'><span>Twitter</span><i class='fa fa-twitter'></i></a><a class='student-linkedin' target='_blank' href='http://www." + studentCard.linkedin + "'><span>LinkedIn</span><i class='fa fa-linkedin'></i></a></p></div><span class='close'>&plus;</span></div></div>");
            for (var skill in studentCard.skills) {
                var studentSkill = studentCard.skills[skill];

                if (studentCard.skills.length > 1) {
                    if (studentSkill == studentCard.skills[studentCard.skills.length - 1]) {
                        $(".popup h4 .student-skills").append(studentSkill.toUpperCase());
                    }
                    else {
                        $(".popup h4 .student-skills").append(studentSkill.toUpperCase() + " / ");
                    }

                } else {
                     if (studentSkill == 'ux') {
                        $(".popup h4 .student-skills").append("User Experience Design");
                    }
                    else if (studentSkill == "ui") {
                        $(".popup h4 .student-skills").append("User Interface Design");

                    }
                    else if (studentSkill == "dev") {
                        $(".popup h4 .student-skills").append("Front-end Development");

                    }
                }
        }

            for (var loc in studentCard.location) {
                var studentLoc = studentCard.location[loc];
                if (studentLoc == studentCard.location[studentCard.location.length - 1]) {
                    $(".popup h4 .student-location").append(studentLoc);
                } else {
                $(".popup h4 .student-location").append(studentLoc + " / ");
                }
            }

            if (studentCard.twitter == "N/A") {
                $('.student-twitter').hide();
            }
            if (studentCard.linkedin == "N/A") {
                $('.student-linkedin').hide();
            }
            if (studentCard.portfolio == "N/A") {
                $('.student-portfolio').hide();
            }
        }
    });
        $('.popup').css('top', topPos).css('height', popHeight);

        $('.img-pop').css('left', leftPos);

        $('.img-pop').animate({
            "left": "0"
        }, 200, "linear");

        setTimeout(function() {
            $('.popup').addClass('popup-animate');
            $(".img-pop").addClass("img-pop-animate");
        }, 1);

        setTimeout(function() {
            $(".bio-container").addClass("bio-container-animate");
        }, 300);

        setTimeout(function() {
            $(".bio-content").fadeIn('fast');
            $('.close').addClass('close-animate');
        }, 800);
    }
}

    var waitForFinalEvent = (function () {
      var timers = {};
      return function (callback, ms, uniqueId) {
        if (!uniqueId) {
          uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
          clearTimeout (timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
      };
    })();

    $(window).resize(function() {
        waitForFinalEvent(function() {
            $(document).off('click', '.card', cardClick);
            $(document).on('click', '.card', cardClick);
            thisCard.addClass('nojQuery');
            thisCard.css('height', '');
            thisCard.children('h2, .disciplines').show();
            $('.arrow-up-animate').removeClass('arrow-up-animate');
            $('.popup').remove();
        }, 50, 'done');

        resizePopup();
        resizeFilter();
    });

    var cohort = document.getElementById('cohort-list'),
        location = document.getElementById('location-list');

    $('.filter-items').bind('mousewheel DOMMouseScroll', function(e) {
        var scrollTo = null;

        if (e.type == 'mousewheel') {
            scrollTo = (e.originalEvent.wheelDelta * -1);
        }
        else if (e.type == 'DOMMouseScroll') {
            scrollTo = 40 * e.originalEvent.detail;
        }

        if (scrollTo) {
            e.preventDefault();
            $(this).scrollTop(scrollTo + $(this).scrollTop());
        }
    });

    $(document).scroll(function() {
        var scrollTopPos = $('main section').offset().top - 80;
        var scrollCurrPos = $('body').scrollTop();

        if (scrollCurrPos >= scrollTopPos) {
            $('nav.sidebar').addClass('fixed');
            $('main section').css('margin-top', '100px');
        } else if (scrollCurrPos < scrollTopPos) {
            $('.fixed').removeClass('fixed');
            $('main section').css('margin-top', '');
            $('.filters').removeClass('filters-animate');
            $('.filter-items').slideUp(200);
        }
    });

    $(document).on('click', 'span.close', function() {
        $(".bio-content").fadeOut('fast', function () {
            $(".bio-container").removeClass("bio-container-animate");
        });

        $('.popup').queue(function () {
            $(this).delay(300).removeClass('popup-animate');
        });

        $(".img-pop").queue(function () {
            $(this).delay(700).removeClass("img-pop-animate");
        });

        $('.popup').queue(function () {
            $(this).delay(1000).remove();
        });
    });

    $(document).on('click', '.button', function() {
        var scrollToTop = $('main section').offset().top - 80;
        $('.filter-items').slideUp(200);
        setTimeout(function() {
            $('.active-filter').removeClass('active-filter');
        }, 201);
        $('body').animate({
            scrollTop: scrollToTop
        }, 300);
        if ($(window).width() <= 550) {
            $(this).parents('.filter').stop();
            $(this).parents('.filter').animate({
               'margin-bottom': ''
            }, 250);
        }
    });

    $(document).on('click', '.filter-label', function() {
        var scrollTopPos = $('main section').offset().top - 80;
        var scrollCurrPos = $('body').scrollTop();

        if (scrollCurrPos < scrollTopPos) {
            $('body').animate({
                scrollTop: scrollTopPos
            }, 300);
            setTimeout(function() {
                $('.filters').addClass('filters-animate');
            }, 301);
        } else {
            $('.filters').toggleClass('filters-animate');
        }
    });

    $(document).mouseup(function (e) {
        var container = $(".filters");

        if (!container.is(e.target) && container.has(e.target).length === 0 && !$('.filter-label').is(e.target)) {
            $('.filters').removeClass('filters-animate');
        }
    });

    function resizePopup() {
        if ($(window).width() <= 885) {
            $(document).mouseup(function (e) {
                var container = $(".popup");
                $(document).off('click', 'span.close', closePopup);
                $(document).on('click', 'span.close', closePopup);

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $(".bio-content").fadeOut('fast');

                $(document).off('click', '.card', cardClick);
                $(document).on('click', '.card', cardClick);
                $(document).off('click', 'span.close', closePopup);

                thisCard.addClass('nojQuery');
                thisCard.css('height', '');
                thisCard.children('h2, .disciplines').show();
                $('.arrow-up-animate').removeClass('arrow-up-animate');

                $('.popup').remove();
                }
            });
        } else {
            $(document).mouseup(function (e) {
            var container = $(".popup");

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('.popup').remove();
            }
        });
        }
    }

    function resizeFilter() {
        if ( $(window).width() <= 550 ) {

            $(document).off('click', '.filter span');
            $(document).on('click', '.filter span', function() {
                var count = $(this).siblings().children('li').size();
                var listItemHeight;
                if (count > 7) {
                    listItemHeight = 335;
                } else {
                    listItemHeight = (count*38) + 35;
                }

                $(this).toggleClass('active-filter');
                $(this).parent('.filter').toggleClass('active-filter');
                $(this).parent().siblings('.filter').children('span').removeClass('active-filter').children().removeClass('active-filter');
                if ($(this).hasClass('active-filter')) {
                    $(this).siblings('.filter-items').slideDown(300);
                    $(this).parent('.filter').stop();
                    $(this).parent('.filter').animate({
                       'margin-bottom': listItemHeight
                    }, 250);
                } else {
                    $(this).siblings('.filter-items').slideUp(300);
                    $(this).parent('.filter').stop();
                    $(this).parent('.filter').animate({
                       'margin-bottom': ''
                    }, 250);
                }
            });

            $('.filters').mouseup(function (e) {
                var container = $(".filter-items");

                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $('.filter-items').slideUp(300);
                    $('.filter-items').parent('.filter').animate({
                        'margin-bottom': ''
                    }, 300);
                    $('.active-filter').removeClass('active-filter');
                }
            });
        } else {
            $(document).off('click', '.filter span');
            $(document).on('click', '.filter span', function() {
                $(this).toggleClass('active-filter');
                $(this).parent().siblings('.filter').children('.filter-items').hide();
                $(this).parent().siblings('.filter').children('span').removeClass('active-filter').children().removeClass('active-filter');
                $(this).siblings('.filter-items').slideToggle(200);
                setTimeout(function() {
                    cohort.scrollTop = 0;
                    location.scrollTop = 0;
                }, 200);
            });
            $(document).mouseup(function (e) {
                var container = $(".filter"),
                    list = $('.filter-items');

                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $('.active-filter').removeClass('active-filter');
                    list.slideUp(200);
                    setTimeout(function() {
                        cohort.scrollTop = 0;
                        location.scrollTop = 0;
                    }, 200);
                }
            });
        }
    }

    $(document).ready(function() {
        resizePopup();
        resizeFilter();
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
})();
