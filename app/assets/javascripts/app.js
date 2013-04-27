$(document).ready(function() {
  // Handler for .ready() called.

    slideNav = function(eventObject, targetElement)
	{
		console.log(targetElement.id);
	};

	var delegate = new Delegate(document);

	delegate.on('click', '.js-slide-nav-btn', slideNav);


	/** Demo one **/

	// Set up options to be used by the two vertical scrollers and create them
	var opts = {
		scrollingX: false,
		scrollResponseBoundary: 1, // This is the default response boundary, spelt out for reference
		scrollBoundary: 15
	};
	new FTScroller(document.querySelector('#gallery_one .scrollable_v1'), opts);
	new FTScroller(document.querySelector('#gallery_one .scrollable_v2'), opts);

	// Set up the horizontal scroller, enabling snapping and disabling bouncing
	var panningOpts = {
		scrollingY: false,
		scrollbars: false,
		snapping: true,
		scrollResponseBoundary: 8,
		scrollBoundary: 20,
		bouncing: false
	};
	var scroller = new FTScroller(document.querySelector('#gallery_one .scrollable_h'), panningOpts);

	function clearInfo() {
		window.setTimeout(function () {
			document.getElementById('info').innerHTML = '';
		}, 1000);
	}



	var scroller2 = new FTScroller(document.getElementById('scrollable'), {
		scrollingY: false,
		snapping: true,
		scrollbars: false
	});

	scroller2.addEventListener('reachedstart', function (response) {
		document.getElementById('info').innerHTML = 'Scroller reached start in the ' + response.axis + ' axis';
		clearInfo();
	});

	scroller2.addEventListener('scrollinteractionend', function (response) {
		document.getElementById('info').innerHTML = 'Scroller reached end in the ' + response.axis + ' axis';
		console.log(response);
		clearInfo();
	});

});


