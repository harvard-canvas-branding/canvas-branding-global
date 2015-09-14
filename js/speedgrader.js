$(document).ready(function(){
    if ($.browser.mozilla && window.location.href.indexOf('gradebook/speed_grader')) {
        $('#left_side_inner').prepend(
            '<div id="autosave_warning" class="ic-flash-error">' +
            'Warning for Firefox users: assignment comments will not be saved automatically -- you must click outside the comment box to save your last entry before navigating to another page. Please use another browser such as Chrome to take advantage of automatic saving.' +
            '</div>'
        );
    };
});
