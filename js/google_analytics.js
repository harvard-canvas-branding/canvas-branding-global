(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-49649810-4', 'auto');
if (typeof ENV !== 'undefined') {
  ga('set', 'dimension1', ENV.COURSE_ID);

  if ( ENV.current_user_roles.indexOf('admin') ) {
    ga('set', 'dimension2', 'admin');
  }
  else if ( ENV.current_user_roles.indexOf('teacher') ) {
    ga('set', 'dimension2', 'teacher');
  }
  else if ( ENV.current_user_roles.indexOf('student') ) {
    ga('set', 'dimension2', 'student');
  }
  else {
    ga('set', 'dimension2', 'user');
  }
}
ga('send', 'pageview');
