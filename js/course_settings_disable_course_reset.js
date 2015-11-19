function isResetCourseButtonPresent(){
    $resetBtn =$('.reset_course_content_button');
    if ($resetBtn.length > 0 )
        return true;
    return false;
}

function disableCourseResetButton(){
  $('.reset_course_content_button').removeAttr("href").addClass('disabled');
}

function initDisableCourseReset() {
  var reCourseSettingsPage = /courses\/.+?\/settings/;
  var windowUrl = window.location.pathname;
  var onCourseSettingsPage = (windowUrl.search(reCourseSettingsPage) != -1);

  if (onCourseSettingsPage) {
    if (isResetCourseButtonPresent()) {
        disableCourseResetButton();
    }
  }
}

$(document).ready(initDisableCourseReset);
