
 function addSelectListHandler(mutations, observer) {
  const roleLists = document.getElementsByName('enrollment_role_id');
  if (!roleLists && typeof observer === 'undefined') {
    console.log('list is not present; adding a mutation observer to watch for it');
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
    console.log(`roleLists: ${roleLists}`);
    for (var dropdown of roleLists) {
      console.log(`adding the handler to ${dropdown}`);
      dropdown.onfocus = function() {
        console.log('in handler');
        $("select[name='enrollment_role_id'] option:contains('(0)')").remove();

        // for(var i = 0; i < this.options.length; i++) {
        //   var opt = this.options[i];
        //   console.log(`removing ${opt.label}`);
        //   console.log(`${typeof(opt)}`);
        //   this.remove(i);
        // }
      }
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
    // Remove options with 0 enrollments from the role dropdown on the People page
    // $("select[name='enrollment_role_id'] option:contains('(0)')").remove();

    // add a handler to the dropdown element
    addSelectListHandler();

    var targetNode = document.getElementsByName('enrollment_role_id')[0];
    var config = { childList: true, subtree: true };
    var callback = function(mutationsList, observer) {
      for (var mutation of mutationsList) {
        if (mutation.type == 'childList') {
          console.log('a child node has been added or removed');
          newNodes = mutation.addedNodes;
          for (var n of newNodes) {
            console.log(n.label)
          }
        }
      }
    }
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

  }
});
