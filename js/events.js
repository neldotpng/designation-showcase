(function () {
	$(document).on('click', '.card', cardClick);
})();

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
	            for (var cohort in data.cohorts) {
	                for (var student in data.cohorts[cohort].students) {
	                    if (cardId == data.cohorts[cohort].students[student].id) {
	                        var cohortGroup = data.cohorts[cohort];
	                        var studentCard = cohortGroup.students[student];
	                        $(thisCard).append(renderStudentCardBio(studentCard, cohortGroup));
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
            for (var cohort in data.cohorts) {
                for (var student in data.cohorts[cohort].students) {
                    if (cardId == data.cohorts[cohort].students[student].id) {
                        var cohortGroup = data.cohorts[cohort];
                        var studentCard = cohortGroup.students[student];
                        $('main section').append("<div class='popup'><img src='"+ studentCard.headshot + "' alt='' class='img-pop'><div class='bio-container'><div class='bio-content'><h2>"+ studentCard.name + "</h2><h3>Graduated " + cohortGroup.year + "</h3><h4><span class='student-skills'></span><br><span class='student-location'></span><br>" + capitalizeFirstLetter(cohortGroup.cohort) + " Cohort</h4><p class='bio'>" + studentCard.bio + "</p><p><a class='student-portfolio' target='_blank' href='http://www." + studentCard.portfolio + "'><span>Portfolio</span><i class='fa fa-briefcase'></i></a><a class='student-twitter' target='_blank' href='http://www.twitter.com/" + studentCard.twitter + "'><span>Twitter</span><i class='fa fa-twitter'></i></a><a class='student-linkedin' target='_blank' href='http://www." + studentCard.linkedin + "'><span>LinkedIn</span><i class='fa fa-linkedin'></i></a></p></div><span class='close'>&plus;</span></div></div>");
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