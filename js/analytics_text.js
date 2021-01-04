
function addAnalyticsTextBlock(guidance_text) {
	// get the name of the current page
	var p = window.location.pathname.split("/");
	var resource = p[p.length - 1];

	// if we are on the old analytics page display the analytics text block
	if (resource == "analytics") {
		// place the text block above the graphs on the page
		$('.course_graphs').before(guidance_text);
	}

}

function initAnalyticsTextBlock(){
	var guidance_text = '<div id="analytics-guidance" class="tlt-analytics-center-alert-info">' +
	'	<div class="tlt-analytics-alert-info">' +
	'		The Faculty Oversight Committee on the Access to Electronic Information provides' +
	' 		<a href="https://harvard.service-now.com/ithelp?id=kb_article&sys_id=dc7fa896db8d170083a2f3f7bf96198f" target="_blank">' +
	' 		<strong>guidance to faculty</strong></a> on using these analytics.' +
	'	</div>' +
	'</div>';

	if (document.title === "New Analytics" ) {
		// place the text block at the top of the #content div
		console.log("On the new analyics page; going to add the message");
		$('#content').prepend(guidance_text);
	}
	else {
		// this may be the old analytics page, where we need to use a Mutation Observer
		MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
		var analyticsObserver = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				// check to see if the text block has already been added
				if( $('#analytics-guidance').length == 0) {
					var $target = $(mutation.target);
					// if the course_graphs class exists, the analytics have been loaded
					// so go ahead and add the text block
					if ($target.find('.course_graphs').length != 0) {
						addAnalyticsTextBlock(guidance_text);
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

}

$(document).ready(initAnalyticsTextBlock);
