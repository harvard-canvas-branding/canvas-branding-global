$(document).ready(function(e) {
  // Remove options with 0 enrollments from the role dropdown on the People page
  $("select[name='enrollment_role_id'] option:contains('(0)')").remove();
});
