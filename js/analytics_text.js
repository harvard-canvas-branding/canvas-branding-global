
function addAnalyticsTextBlock() {
	// get the name of the current page
	var p = window.location.pathname.split("/");
	var resource = p[p.length - 1];

	// if we are on the analytics page display the analytics text block
	if (resource == "analytics") {
		var guidance_text = '<div id="analytics-guidance" class="center-alert-info">' +
			'	<div class="alert-info">' +
			'		The Faculty Oversight Committee on the Access to Electronic Information provides' +
			' 		<a href="https://wiki.harvard.edu/confluence/display/canvas/Electronic+Information+in+Canvas" target="_blank">' +
			' 		<strong>guidance to faculty</strong></a> on using these analytics.' +
			'	</div>' +
			'</div>';

		// place the text block above the graphs on the page
		$('.course_graphs').before(guidance_text);

	}
}


function initAnalyticsTextBlock(){

	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	var analyticsObserver = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			// check to see if the text block has already been added
			if( $('#analytics-guidance').length == 0) {
				var $target = $(mutation.target);
				// if the course_graphs class exists, the analytics have been loaded
				// so go ahead and add the text block
				if ($target.find('.course_graphs').length != 0) {
					addAnalyticsTextBlock();
					// remove the observer once we have added the block
					analyticsObserver.disconnect();
				}
			}
		});
	});

	var $config = {
			childList: true,
			subtree: true,
			attributes: false,
			characterData: false,
	};

	analyticsObserver.observe(document.body, $config);

}

$(document).ready(initAnalyticsTextBlock);
