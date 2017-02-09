function isStartCourseButtonPresent(){
    $btn = $('#right-side > div > button#start_new_course');
    return $btn.length > 0;
}

function removeStartCourseButton(){
  $('#right-side > div > button#start_new_course').remove();
}

function initDisableDashboardStartCourse() {
  // There's a "Start a New Course" button on the dashboard
  // that we want to remove

  if ($("body[class*=context-user_]")) {
    if(isStartCourseButtonPresent()){
      removeStartCourseButton();
    }
  }
}

$(document).ready(initDisableDashboardStartCourse);
