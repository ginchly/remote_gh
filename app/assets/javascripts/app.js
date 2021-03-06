// Globals
var currentSlide;
var delegate;
var countdown = 0;
var timer;

$(document).ready(function() {
	// Set up ajax so it works with credentials
	$.ajaxSetup({
		type: "POST",
		data: {},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});

	var password = 'androidalienofdeath';

	delegate = new Delegate(document);

	// reset timer
	timer = 0;
	setInterval(decreaseTimer, 1000);
	delegate.on('click', '#js-timer-icon', incrementTimer);
	// login user and get the list of slideshows, assigned to global var slideshowList
	delegate.on('click', '#login', function(){loginUser(password);});
});

function loginUser(password) {
	// Get login cookie
	var url = 'http://tatw.name:8000/login?password=' + password;

	var jqxhr = $.ajax( url )
    .done
	(function(data, textStatus, jqXHR)
		{
			// On success get list of that users slideshows
			getSlideshowList();
		}
    )
    .fail(function() { alert("error"); });

}

function getSlideshowList() {
	var url = 'http://tatw.name:8000/list';

	var jqxhr = $.ajax({
		url: url
	}).done(function() { showSlideshowList(jqxhr.responseText); });
}

function showSlideshowList(slideshowList) {

	$('#slideshowList').empty();

	var slideshows = JSON.parse(slideshowList).presentations;
	for (var i=0;i<slideshows.length;i++)
	{
		// Add the slideshow to the list
		$('#slideshowList').append('<li><a href="#appcontroller" class="js-load-slideshow" data-transition="flip" id="' + slideshows[i].file + '"">' + slideshows[i].title +'</a></li>');

	}
	$('ul').listview('refresh');

	// Add click handlers to slideshow lists
	delegate.on('click', '.js-load-slideshow', initSlideshow);
}



function initSlideshow(event) {
	// Make request to load slideshow
	// Display loading screen whilst waiting for response

	// Initialisation
	var presentationDetails;

	// Get number of slides, use id of delegate element
	var url = 'http://tatw.name:8000/get_info/' + event.target.id;

	var jqxhr = $.ajax({
		url: url
	}).done
	(function(data, textStatus, jqxhr)
		{
			presentationDetails = JSON.parse(jqxhr.responseText).presentations[0];
			url = 'http://tatw.name:8000/start/' + event.target.id;

			var jqxhrGetSlideshow = $.ajax({
				url: url
			}).done
			(function(data, textStatus, jqXHR)
				{
					// On success set up slides
					createSlides(presentationDetails);
				}
			)
			.fail(function() { alert("error"); });
		}
    )
    .fail(function() { alert("error"); });



    delegate.on('click', '.js-end-slideshow', endSlideshow);
    

	// Set up FT scroller on scrollable element
	var slideScroll = new FTScroller(document.getElementById('scrollable'), {
		scrollingY: false,
		snapping: true,
		scrollbars: false,
		paginatedSnap: true
	});

	// Add event listeners
	slideScroll.addEventListener('segmentwillchange', function (response) {
		// Output slide in view to the console
		var nextSlide = response.segmentX;
		console.log(nextSlide);

		// Make API call to move slide forward / back
		var direction;
		if (nextSlide > currentSlide.x) {
			direction = 'forward';
		} else if(nextSlide < currentSlide.x) {
			direction = 'backward';
		}
		changeSlide(direction);
	});

	// Subscribe to pinch to go back to menu
	$$('#scrollable').pinchIn(function() {
		endSlideshow();
		$.mobile.changePage('#filelist');
	});

	slideScroll.addEventListener('scrollstart', function (response) {
		// Update current slide variable
		currentSlide = slideScroll.currentSegment;

		// Output slide in view to the console
		console.log(currentSlide);
	});


}

function endSlideshow() {
	// reset timer
	resetTimer();
	// send ajax request to end slideshow
	var url = 'http://tatw.name:8000/close';
	var jqxhr = $.ajax({
		url: url
	});

	// delete all sections from slideshows
	$('#sectionwrapper').empty();
	// go back to menu
}

function changeSlide(direction) {
	if (direction === 'forward') {
		console.log('forward a slide');
		url = 'http://tatw.name:8000/forward';

		jqxhr = $.ajax({
			url: url
		});

	} else if (direction === 'backward') {
		console.log('back a slide');
		url = 'http://tatw.name:8000/backward';

		jqxhr = $.ajax({
			url: url
		});
	}
}

function createSlides(presentationDetails) {
	var scrollableWidth = $("#scrollable").width();
	for (var i=0;i<presentationDetails.num_of_pages;i++)
		{
			// Add the "slide" to the DOM
			$('#sectionwrapper').append('<section><div><h2>' + presentationDetails.pages[i] +'</h2></div></section>');
		}
	$("#sectionwrapper").width(presentationDetails.num_of_slides * scrollableWidth);
	$("#sectionwrapper section").width(scrollableWidth);
}


function incrementTimer() {
	if (timer < 300) {
		timer = timer + 60;
	} else {
		timer = timer + 300;
	}
	displayTimer("#time-remaining");
}

function decreaseTimer() {
	timer = timer -1;
	displayTimer("#time-remaining");
}

function displayTimer(targetDiv) {
	if (timer < 0) {
		timer = 0;
	}
	var minutes = Math.floor(timer / 60);
	var seconds = timer - minutes * 60;
	$(targetDiv).html(minutes + " mins " + seconds + " secs");
}

function resetTimer() {
	timer = 0;
}