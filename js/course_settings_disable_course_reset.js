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

  if (onCourseSettingsPage && isResetCourseButtonPresent()) {
    disableCourseResetButton();

    var classAttrObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        console.log(mutation.type);
        console.log(mutation.target);
      })
    });

    // content is the closest parent that's reliably availble on document.ready()
    var $content = $('body');
    if ($content.length > 0) {
      classAttrObserver.observe($content.get(0), {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: false
      });
    }
  }
}

$(document).ready(initDisableCourseReset);
