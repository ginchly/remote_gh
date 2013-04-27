// Globals
var currentSlide;




$(document).ready(function() {

	$('#loadingDiv')
    .hide()  // hide it initially
    .ajaxStart(function() {
        $(this).show();
    })
    .ajaxStop(function() {
        $(this).hide();
    });

	var password = 'androidalienofdeath';
	loginUser(password);
	initSlideshow();

});

function loginUser(password) {
	// Get login cookie
	var url = 'http://tatw.name:8000/login?password=' + password;

	var jqxhr = $.ajax( url )
    .done
	(function(data, textStatus, jqXHR)
		{
			// On success get list of that users slideshows
			//getSlideshowList();
		}
    )
    .fail(function() { alert("error"); });

}

function getSlideshowList() {
	var url = 'http://tatw.name:8000/list';

	var jqxhr = $.ajax({
		url: url,
		xhrFields: {
			withCredentials: true
		}
	}).done(function() { alert(jqxhr); });

}



function initSlideshow() {
	// Make request to load slideshow
	// Display loading screen whilst waiting for response

	// Initialisation

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

	// Subscribe to swipe up
	$$('#scrollable').swipeDown(function() {
		console.log('swipe down footer');
		$(".navbar-inner").animate({
			height: 700
			}, 750 );
	});
	$$('.navbar').swipeUp(function() {
		console.log('swipe down footer');

		$(".navbar-inner").animate({
			height: 50
		}, 750 );
	});

	// Subscribe to pinch to go back to menu
	$$('#scrollable').pinchIn(function() {
		alert('pinch');
	});

	slideScroll.addEventListener('scrollstart', function (response) {
		// Update current slide variable
		currentSlide = slideScroll.currentSegment;

		// Output slide in view to the console
		console.log(currentSlide);
	});

	createSlides(5);

}

function changeSlide(direction) {
	if (direction === 'forward') {
		console.log('forward a slide');
	} else if (direction === 'backward') {
		console.log('back a slide');
	}
}

function createSlides(numSlides) {
	var scrollableWidth = $("#scrollable").width();

	for (var i=0;i<numSlides;i++)
		{
			// Start slide numbers from 1 not 0
			var slideNum = i + 1;
			// Add the "slide" to the DOM
			$('#sectionwrapper').append('<section><div><h2>Slide ' + slideNum +'</h2></div></section>');
		}
	$("#sectionwrapper").width(numSlides * scrollableWidth);
	$("#sectionwrapper section").width(scrollableWidth);
}


/*
    slideNav = function(eventObject, targetElement)
	{
		console.log(targetElement.id);
	};

	var delegate = new Delegate(document);

	delegate.on('click', '.js-slide-nav-btn', slideNav);


*/