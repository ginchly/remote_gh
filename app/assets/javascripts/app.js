$(document).ready(function() {
  // Handler for .ready() called.


	var scrollableWidth = $("#scrollable").width();

	var createSlides = function(numSlides) {
	for (var i=0;i<numSlides;i++)
		{
			// Start slide numbers from 1 not 0
			var slideNum = i + 1;
			// Add the "slide" to the DOM
			$('#sectionwrapper').append('<section><div><h2>Slide ' + slideNum +'</h2></div></section>');
		}
		$("#sectionwrapper").width(numSlides * scrollableWidth);
	};
	createSlides(5);
	$("#sectionwrapper section").width(scrollableWidth);

    slideNav = function(eventObject, targetElement)
	{
		console.log(targetElement.id);
	};

	var delegate = new Delegate(document);

	delegate.on('click', '.js-slide-nav-btn', slideNav);


	function clearInfo() {
		window.setTimeout(function () {
			document.getElementById('info').innerHTML = '';
		}, 1000);
	}


/*


	var scroller2 = new FTScroller(document.getElementById('scrollable'), {
		scrollingY: false,
		snapping: true,
		scrollbars: false,
		paginatedSnap: true
	});

	scroller2.addEventListener('segmentwillchange', function (response) {
		console.log('changed');
	});

	scroller2.addEventListener('scrollinteractionend', function (response) {
		document.getElementById('info').innerHTML = 'Scroller reached end in the ' + response.axis + ' axis';
		console.log(response);

		clearInfo();
	});

*/

/*


	debugger;
	var wholePageScroller = new FTScroller(document.getElementById('container-scrollable'), {
		scrollingX: false
	});

	wholePageScroller.addEventListener('segmentwillchange', function (response) {
		console.log('verticalchanged');
	});


	console.log(scrollableWidth);

	*/

});


