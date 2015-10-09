console.log('templates');

function renderStudentCardBio (studentCard, cohortGroup) {
	return
		'<div class="popup">' + 
			'<div class="arrow-up"></div>' + 
			'<img src="'+ studentCard.headshot + '" alt="" class="img-pop">' + 
				'<div class="bio-container"><div class="bio-content">' + 
					'<h2>' + studentCard.name + '</h2><h3>Graduated ' + cohortGroup.year + '</h3>' + 
					'<h4>' + 
						'<span class="student-skills"></span><br>' + 
						'<span class="student-location"></span><br>' +
						capitalizeFirstLetter(cohortGroup.cohort) + ' Cohort' + 
					'</h4>' +
					'<p class="bio">' +
						studentCard.bio +
					'</p>' +
					'<p>' +
						'<a class="student-portfolio" target="_blank" href="http://www.' + studentCard.portfolio + '">' +
							'<span>Portfolio</span>' + 
							'<i class="fa fa-briefcase"></i>' + 
						'</a>' + 
						'<a class="student-twitter" target="_blank" href="http://www.twitter.com/' + studentCard.twitter + '">' +
							'<span>Twitter</span>' + 
							'<i class="fa fa-twitter"></i>' +
						'</a>' + 
						'<a class="student-linkedin" target="_blank" href="http://www.' + studentCard.linkedin + '">' + 
							'<span>LinkedIn</span>' + 
							'<i class="fa fa-linkedin"></i>' +
						'</a>' + 
					'</p>' +
				'</div>' +
				'<span class="close">&plus;</span>' +
			'</div>' +
		'</div>';
}