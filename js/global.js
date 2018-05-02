function isAddUserButtonPresent(){
    $btn = $('#right-side > div.rs-margin-bottom > a.add_user_link.Button.button-sidebar-wide');
    return $btn.length > 0;
}

function isAddCourseButtonPresent(){
    $btn = $('#right-side > div.rs-margin-bottom > a.add_course_link.Button.button-sidebar-wide');
    return $btn.length > 0;
}

function disableAddUserButton(){
  // remove the href asd well so people can't get the url
  // and try it directly
  $('#right-side > div.rs-margin-bottom > a.add_user_link.Button.button-sidebar-wide').removeAttr("href").addClass('disabled');
}

function disableAddCourseButton(){
  // remove the href asd well so people can't get the url
  // and try it directly
  $('#right-side > div.rs-margin-bottom > a.add_course_link.Button.button-sidebar-wide').removeAttr('href').addClass('disabled');
}

function initDisableAddUserCourse() {
  // These button appear on multiple pages in the account area.
  // So far I have found them on the root account page, the settings page,
  // and the users page. There could be other pages as well.

  //var reAccountPage = /accounts\/.+?/;
  //var windowUrl = window.location.pathname;
  //var onAccountPage = (windowUrl.search(reAccountPage) != -1);

  if ($("body[class*=context-account_]")) {
    if (isAddUserButtonPresent()) {
      disableAddUserButton();
    }

    if(isAddCourseButtonPresent()){
      disableAddCourseButton();
    }
  }
}

$(document).ready(initDisableAddUserCourse);

function addAnalyticsTextBlock() {
	// get the name of the current page
	var p = window.location.pathname.split("/");
	var resource = p[p.length - 1];

	// if we are on the analytics page display the analytics text block
	if (resource == "analytics") {
		var guidance_text = '<div id="analytics-guidance" class="tlt-analytics-center-alert-info">' +
			'	<div class="tlt-analytics-alert-info">' +
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
function addCourseConcludeButtonDisabledMessage() {
  var msg = '(Please contact your local academic support staff to conclude the course)';
  var $concludeButton = $("a[class~='Button'][href$='event=conclude']");
  $concludeButton.addClass('conclude_course_link');
  $concludeButton.append('<p><em>' + msg + '</em></p>');
}

function addCourseConcludeDateDisabledMessage() {
  var msg = '(Please contact your local academic support staff to change the course conclude date)';
  if ( $('#course_conclude_at').closest('tr').find('p').length == 0 ) {
    $('#course_conclude_at').closest('tr').find('div.aside').after('<p><em>' + msg + '</em></p>');
  }
}

function addCourseUnconcludeButtonDisabledMessage() {
  var msg = '(Please contact your local academic support staff to un-conclude this course)'
  var $unconcludeButton = $("form[action$='unconclude']").find('button');
  $unconcludeButton.addClass('unconclude_course_link');
  $unconcludeButton.append('<p><em>' + msg + '</em></p>');
}

function disableCourseConcludeButton() {
  var $concludeButton = $("a[class~='Button'][href$='event=conclude']");
  $concludeButton.attr('disabled', true);
}

function disableCourseUnconcludeButton() {
  var $unconcludeButton = $("form[action$='unconclude']").find('button');
  $unconcludeButton.attr('disabled', true);
}

function disableCourseConcludeDate() {
  var $concludeDateUIComponents = $('#course_conclude_at').closest('tr').find('div, i, input, button');
  $concludeDateUIComponents.addClass("selection-disabled").attr("disabled", true);
}

function isConcludeButtonPresent(){
    $concludeBtn =$("a[class~='Button'][href$='event=conclude']");
    if ($concludeBtn.length > 0 )
        return true;
    return false;
}

function initHUGlobal() {
  var reCourseSettingsPage = /courses\/.+?\/settings/;
  var windowUrl = window.location.pathname;
  var onCourseSettingsPage = (windowUrl.search(reCourseSettingsPage) != -1);

  if (onCourseSettingsPage) {
    if (isConcludeButtonPresent()) {
        disableCourseConcludeButton();
        addCourseConcludeButtonDisabledMessage();
    }else {
        disableCourseUnconcludeButton();
        addCourseUnconcludeButtonDisabledMessage();
    }
    


    // datepicker is not always available on document.ready(), and doesn't
    // trigger mutations when added to DOM, so we have to track when it gets
    // added by looking at its associated input field
    var classAttrObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        var $target = $(mutation.target);
        if ($target.not('.datepickerDisabled').hasClass('hasDatepicker')) {
          $target.addClass('datepickerDisabled');
          disableCourseConcludeDate();
          addCourseConcludeDateDisabledMessage();
          classAttrObserver.disconnect();
        }
      })
    });

    // content is the closest parent that's reliably availble on document.ready()
    var $content = $('#content');
    if ($content.length > 0) {
      classAttrObserver.observe($content.get(0), {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: false,
        attributeFilter: ['class']
      });
    }
  }
}

$(document).ready(initHUGlobal);
function isResetCourseButtonPresent(){
    $resetBtn =$('.reset_course_content_button');
    return $resetBtn.length > 0;
}

function disableCourseResetButton(){
  $('.reset_course_content_button').removeAttr("href").addClass('disabled');
}

function initDisableCourseReset() {
  var reCourseSettingsPage = /courses\/.+?\/settings/;
  var windowUrl = window.location.pathname;
  var onCourseSettingsPage = (windowUrl.search(reCourseSettingsPage) != -1);

  if (onCourseSettingsPage && isResetCourseButtonPresent()) {
    disableCourseResetButton();
  }
}

$(document).ready(initDisableCourseReset);
$(document).ready(function(e) {
  // Remove options with 0 enrollments from the role dropdown on the People page
  $("select[name='enrollment_role_id'] option:contains('(0)')").remove();
});
$(document).ready(function(e) {
    /* NOTE: with the current (as of 2016-04-06) styling on the canvas UI,
     * the below copy needs to be wrapped in a div to avoid having the spacing
     * in between it getting squished down to nothing when the viewport is wide
     * enough.  also, wrapping things in <p> tags doesn't get you multiple
     * lines
     */
    var harvardCopy =
        '<div>Copyright &copy; 2017 The President and Fellows of Harvard College | ' +
        '<a href="https://wiki.harvard.edu/confluence/display/canvas/Harvard+Privacy+Policy+for+Canvas" id="privacy_policy_link">Privacy Policy</a> | ' +
        '<a href="https://wiki.harvard.edu/confluence/display/canvas/Harvard+Acceptable+Use+Policy+for+Canvas" id="acceptable_use_policy_link">Acceptable Use Policy</a>' +
        '</div>';
    $('footer').html(harvardCopy);
});
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-49649810-4', 'auto');
try {
  if (typeof ENV !== 'undefined') {
    ga('set', 'dimension1', ENV.COURSE_ID);

    if ( ENV.current_user_roles.indexOf('admin') != -1 ) {
      ga('set', 'dimension2', 'admin');
    }
    else if ( ENV.current_user_roles.indexOf('teacher') != -1 ) {
      ga('set', 'dimension2', 'teacher');
    }
    else if ( ENV.current_user_roles.indexOf('student') != -1 ) {
      ga('set', 'dimension2', 'student');
    }
    else {
      ga('set', 'dimension2', 'user');
    }
  }
}
catch(err) {
  // do nothing
}


ga('send', 'pageview');
;((function() {

  function onEditablePage() {
    return ($('body').hasClass('syllabus') || $('body').hasClass('pages'));
  }

  // If we're on a page with the course info iframe, set up bidirectional
  // messaging to keep iframe size in sync with embedded document size
  ((function init() {
    if (onEditablePage()) {
      var iframeResizerCDN = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.1/iframeResizer.min.js';
      var courseInfoObserver = new MutationObserver(function (mutations) {
          var $widgets = $('div#content').find('iframe[title="Course Info"]');
          if ($widgets.length > 0) {
            require(['jquery', iframeResizerCDN], function() {
              $widgets.iFrameResize();
              // assumes all iframes were added simultaneously
              courseInfoObserver.disconnect();
            });
          }
      });

      var moConfig = {
        childList: true,
        subtree: true
      };

      courseInfoObserver.observe(document.getElementById('content'), moConfig);
    }
  })());
})());
// source: TLT Canvas Liaison FAQ
var huToolVisibilityRestricted = [
  // Course-level
  "A/B Testing Tool",
  "Manage People",
  "Manage Sections",
  "Course Emailer",
  "Import iSites Content",
  "Manage Course",
];

function huFuzzyVisUpdate(tool){
  return $("div[id='left-side'] a[class^='context_external_tool']:contains('"+ tool + "')")
    .parent().addClass('section-tab-hidden');
}

function huExactVisUpdate(tool){
  return $("div[id='left-side'] a[class^='context_external_tool']")
    .filter(function(){ return $(this).text() === tool })
    .parent().addClass('section-tab-hidden');
}


/*
 Changes the link style of a specified list of custom tools in the left-hand nav
  to indicate they are not visible to students (current Canvas behavior is to show
  the link text in grey).
  toolList: Array of strings representing the link text of all
            tools that need to be marked as visible only to admins.
  exactMatch: If true, will only match tool links with the exact names in toolList.
              If any other value (or if not provided an argument), will match any
              tool whose link text begins with one of the toolList values.
 */
function huUpdateCustomToolsVisibilityIndicator(toolList, exactMatch){
  var updateFunction = ((exactMatch === true) ? huExactVisUpdate : huFuzzyVisUpdate);
  $.each(toolList, function(index, tool) { updateFunction(tool); });
}

$(document).ready(huUpdateCustomToolsVisibilityIndicator(huToolVisibilityRestricted));

function sortTermDropdown(){
  var termSelect = $('select[name="enrollment_term_id"]');
  var selectedOption = $(termSelect).val();
  var termSelectList = $('option', termSelect);
  var re_letter = /^[A-Za-z]/;
  var re_number = /^[0-9]/;

  var topList = new Array();
  var middleList = new Array();
  var bottomList = new Array();

  for (var i=0; i < termSelectList.length; i++) {
    if (termSelectList[i].label == 'All Terms') {
      // this should be the first item in the list
      topList.unshift(termSelectList[i]);
    }
    else if (termSelectList[i].label == 'Ongoing') {
      // this should be the second item in the list
      topList.push(termSelectList[i]);
    }
    else if (termSelectList[i].label.match(re_letter)) {
      // all other items that start with a letter will go at the bottom, sorted ascending
      bottomList.push(termSelectList[i]);
    }
    else {
      // all of the items that start with a number will go below the first two items, sorted descending
      middleList.push(termSelectList[i]);
    }
  }

  var newList = topList.concat(
    middleList.sort(function(a,b){
      return (a.label >= b.label) ? -1 : 1;
    }),
    bottomList.sort(function(a,b){
      return (a.label >= b.label) ? 1 : -1;
    })
  );
  $(termSelect).html(newList).val(selectedOption);
}

function sortTermTable(){
  var termRowList = $('table#terms tbody tr.term').get();
  var re_letter = /^[A-Za-z]/;
  var re_number = /^[0-9]/;
  var topList = new Array;
  var bottomList = new Array;

  for (var i=0; i < termRowList.length; i++) {
    if (termRowList[i].getElementsByClassName('name')[0].innerHTML.match(re_number)) {
      // all of the term labels that start with a number are at the top, sorted descending
      topList.push(termRowList[i]);
    }
    else {
      // term labels that start with a letter are at the bottom, sorted ascending
      bottomList.push(termRowList[i]);
    }
  }

  var newList = topList.sort(function(a,b){
      var alabel = a.getElementsByClassName('name')[0].innerHTML;
      var blabel = b.getElementsByClassName('name')[0].innerHTML;

      return (alabel >= blabel) ? -1 : 1;
    }).concat(
      bottomList.sort(function(a,b){
        var alabel = a.getElementsByClassName('name')[0].innerHTML;
        var blabel = b.getElementsByClassName('name')[0].innerHTML;
        return (alabel >= blabel) ? 1 : -1;
      })
    );

  $('table#terms').children('tbody').append(newList);

}

$(document).ready(function() {
  if ($('select[name="enrollment_term_id"]').length > 0) {
    sortTermDropdown();
  }
  if ($('table#terms').length > 0) {
    sortTermTable();
  }
});
// This script will modify the "Unauthorized" message that users may see if they click through
// to the course home page, but the course hasn't been published yet. The message has been
// modified to be a little more user friendly.
require(['jquery'], function($) {

    /**
     * This function checks to see if the page is in the context of the course.
     *
     * @returns {Boolean} True if it is the course home, otherwise false.
     */
    function is_course_page() {
        return /^\/courses\/\d+/.test(window.location.pathname);
    };

    /**
     * This function modifies the unauthorized message on the page by tweaking
     * the HTML. Here's an example of what the HTML looks like prior to modification:
     *
     * <div id="unauthorized_holder">
     *  <div id="unauthorized_message" class="">
     *      <h2 class="ui-state-error">
     *      Unauthorized
     *      </h2>
     *      <p>
     *      It appears that you don&#x27;t have permission to access this page. Please make sure you&#x27;re authorized to view this content.
     *      If you think you should be able to view this page, please use the &quot;Help&quot; link to notify support of the problem.
     *      </p>
     *  </div>
     * </div>
     *
     * @returns undefined
     */
    function modify_unauthorized_message(msg) {
        var $holder = $('#unauthorized_holder');

        if($holder.length > 0) {
            $holder.find('h2').html(msg.title);
            $holder.find('p').replaceWith(msg.content);
            $holder.find('p:first').css({paddingBottom: 0});
        }
    };


    // Modifies the unauthorized message if present on the course page
    if(is_course_page()) {
        modify_unauthorized_message({
            title: 'Not Available',
            content: '<p>You do not currently have access to view this page. It may be that the site has not yet been published by the teaching staff, or that access to the site is restricted.</p><p>If you think you should have access, please use the "Help" link to contact support.</p>'
        });
    }

});
