if (window.ga && ga.loaded) {
  try {
    ga('create', 'UA-49649810-4', 'auto', 'huTracker');
    ga('huTracker.set', 'anonymizeIp', true);

    if (typeof ENV !== 'undefined') {
      ga('huTracker.set', 'dimension1', ENV.COURSE_ID);

      if ( ENV.current_user_roles.indexOf('admin') != -1 ) {
        ga('huTracker.set', 'dimension2', 'admin');
      }
      else if ( ENV.current_user_roles.indexOf('teacher') != -1 ) {
        ga('huTracker.set', 'dimension2', 'teacher');
      }
      else if ( ENV.current_user_roles.indexOf('student') != -1 ) {
        ga('huTracker.set', 'dimension2', 'student');
      }
      else {
        ga('huTracker.set', 'dimension2', 'user');
      }
    }

    ga('huTracker.send', 'pageview');
  }
  catch(err) {
    // do nothing
  }
}
