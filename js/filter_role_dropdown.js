
function checkRoleList(mutations, observer) {
  const roleLists = document.getElementsByName('enrollment_role_id');
  if (!roleLists && typeof observer === 'undefined') {
    const obs = new MutationObserver(checkRoleList);
    obs.observe(document.body, {
      'childList' : true
    });
  }
  if (roleLists) {
    if (typeof observer !== 'undefined') {
      console.log('disconnecting the observer');
      observer.disconnect();
    }
    console.log('removing the options');
    $("select[name='enrollment_role_id'] option:contains('(0)')").remove();
  }
}

$(document).ready(function(e) {

  var reCourseSettingsPage = /courses\/.+?\/settings/;
  var reCoursePeoplePage = /courses\/.+?\/users/;
  var windowUrl = window.location.pathname;
  var onCourseSettingsPage = (windowUrl.search(reCourseSettingsPage) != -1);
  var onCoursePeoplePage = (windowUrl.search(reCoursePeoplePage) != -1);

  if (onCourseSettingsPage) {
    // Remove TRs in the right-hand column Current Users table that have "None"
    $("aside#right-side > div > table.summary > tbody > tr > td:contains('None')").parent().hide();
  }

  if (onCoursePeoplePage) {
    // Remove options with 0 enrollments from the role dropdown on the People page
    // $("select[name='enrollment_role_id'] option:contains('(0)')").remove();
    checkRoleList();
  }
});
