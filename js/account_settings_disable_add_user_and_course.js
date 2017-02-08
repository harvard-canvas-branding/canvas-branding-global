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
