
function addSelectListHandler(mutations, observer) {
  const roleList = document.getElementsByName('enrollment_role_id').item(0);
  if (!roleList && typeof observer === 'undefined') {
    const obs = new MutationObserver(addSelectListHandler);
    obs.observe(document.body, {
      'childList' : true,
      'subtree' : true
    });
  }
  if (roleList) {
    if (typeof observer !== 'undefined') {
      console.log('disconnecting the observer');
      observer.disconnect();
    }
    roleList.onfocus = function() {
      $("select[name='enrollment_role_id'] option:contains('(0)')").remove();
    }

  }
  console.log('done');
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
    // add a handler to the dropdown element
    addSelectListHandler();
  }
});
