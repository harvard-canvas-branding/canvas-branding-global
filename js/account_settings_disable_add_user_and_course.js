function isAddUserButtonPresent(){
    $btn =$('a.add_user_link');
    return $btn.length > 0;
}

function isAddCourseButtonPresent(){
    $btn =$('a.add_course_link');
    return $btn.length > 0;
}

function disableAddUserButton(){
  $('a.add_user_link').removeAttr("href").addClass('disabled');
}

function disableAddCourseButton(){
  $('a.add_course_link').removeAttr('href').addClass('disabled');
}

function initDisableAddUserCourse() {
  var reAccountPage = /accounts\/.+?\/.+?/;
  var windowUrl = window.location.pathname;
  var onAccountPage = (windowUrl.search(reAccountSettingsPage) != -1);

  if (onAccountPage) {
    if (isAddUserButtonPresent()) {
      disableAddUserButton();
    }
    if(isAddCourseButtonPresent()){
      disableAddCourseButton();
    }
  }
}

$(document).ready(initDisableAddUserCourse);
