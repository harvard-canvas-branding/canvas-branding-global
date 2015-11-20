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
