$(document).ready(function() {
  // Handler for .ready() called.


	var createSlides = function(numSlides) {
	for (var i=0;i<numSlides;i++)
		{
			// Start slide numbers from 1 not 0
			var slideNum = i + 1;
			// Add the "slide" to the DOM
			$('#sectionwrapper').append('<section><div><h2>Slide ' + slideNum +'</h2></div></section>');
		}
	};
	createSlides(5);

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



	var scroller2 = new FTScroller(document.getElementById('scrollable'), {
		scrollingY: false,
		snapping: true,
		scrollbars: false,
		paginatedSnap: true
	});

	scroller2.addEventListener('reachedstart', function (response) {
		document.getElementById('info').innerHTML = 'Scroller reached start in the ' + response.axis + ' axis';
		clearInfo();
	});

	scroller2.addEventListener('scrollinteractionend', function (response) {
		document.getElementById('info').innerHTML = 'Scroller reached end in the ' + response.axis + ' axis';
		console.log(response);
		/*
		var jqxhr = $.ajax( "example.php" )
		    .done(function() { alert("success"); })
		    .fail(function() { alert("error"); })
		    .always(function() { alert("complete"); });
		    */
		clearInfo();
	});

	var scrollableWidth = $("#scrollable").width();
	$("#sectionwrapper section").width(scrollableWidth);

	console.log(scrollableWidth);

});


