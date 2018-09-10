
function addAnalyticsTextBlock() {
	// get the name of the current page
	var p = window.location.pathname.split("/");
	var resource = p[p.length - 1];

	// if we are on the analytics page display the analytics text block
	if (resource == "analytics") {
		var guidance_text = '<div id="analytics-guidance" class="tlt-analytics-center-alert-info">' +
			'	<div class="tlt-analytics-alert-info">' +
			'		The Faculty Oversight Committee on the Access to Electronic Information provides' +
			' 		<a href="https://harvard.service-now.com/ithelp?id=kb_article&sys_id=dc7fa896db8d170083a2f3f7bf96198f" target="_blank">' +
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
