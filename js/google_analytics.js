(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','harvardga');

harvardga('create', 'UA-49649810-4', 'auto');
try {
  if (typeof ENV !== 'undefined') {
    harvardga('set', 'dimension1', ENV.COURSE_ID);

    if ( ENV.current_user_roles.indexOf('admin') != -1 ) {
      harvardga('set', 'dimension2', 'admin');
    }
    else if ( ENV.current_user_roles.indexOf('teacher') != -1 ) {
      harvardga('set', 'dimension2', 'teacher');
    }
    else if ( ENV.current_user_roles.indexOf('student') != -1 ) {
      harvardga('set', 'dimension2', 'student');
    }
    else {
      harvardga('set', 'dimension2', 'user');
    }
  }
}
catch(err) {
  // do nothing
}


harvardga('send', 'pageview');
