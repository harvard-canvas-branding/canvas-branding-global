
function addAnalyticsTextBlock() {
	// get the name of the current page
	var p = window.location.pathname.split("/");
	var filename = p[p.length - 1];

	// if we are on the analytics page display the analytics text block
	if (filename == "analytics") {

		var guidance_text = '<div class="center-alert-info">' +
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

			if( $('.center-alert-info').length == 0) {

				var $target = $(mutation.target);

				if ($target.find('.course_graphs').length != 0) {

					addAnalyticsTextBlock();
					//console.log(mutation);
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
