function isAddUserButtonPresent(){
    $btn = $('a.add_user_link');
    return $btn.length > 0;
}

function isAddCourseButtonPresent(){
    $btn = $('a.add_course_link');
    return $btn.length > 0;
}

function disableAddUserButton(){
  // remove the href asd well so people can't get the url
  // and try it directly
  $('a.add_user_link').removeAttr("href").addClass('disabled');
}

function disableAddCourseButton(){
  // remove the href asd well so people can't get the url
  // and try it directly
  $('a.add_course_link').removeAttr('href').addClass('disabled');
}

function initDisableAddUserCourse() {
  // These button appear on multiple pages in the account area.
  // So far I have found them on the root account page, the settings page,
  // and the users page. There could be other pages as well.
  var reAccountPage = /accounts\/.+?/;
  var windowUrl = window.location.pathname;
  var onAccountPage = (windowUrl.search(reAccountPage) != -1);

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
