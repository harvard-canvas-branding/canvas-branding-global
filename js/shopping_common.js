/**
 * Common shopping code
 */

var current_user_id = ENV['current_user_id'];
var user_url = '/api/v1/users/' + current_user_id + '/profile';
var course_id = get_course_number();
var course_url = '/api/v1/courses/' + course_id ;
var login_url = window.location.origin+"/login";
var shopping_tool_url = "https://icommons-tools.dev.tlt.harvard.edu/shopping";

/**
 * Tool tip text and html link
 * @type {string}
 */
var shopping_help_doc_url = 'https://wiki.harvard.edu/confluence/display/canvas/Course+Shopping';
var data_tooltip = 'More info about access during shopping period';
var tooltip_link = '<a data-tooltip title="' + data_tooltip + '" target="_blank" href="' +
  shopping_help_doc_url + '"><i class="icon-question"></i></a>';

var no_user_canvas_login = '<div class="tltmsg tltmsg-shop"><p class="participate-text">Students: ' +
  '<a href="'+login_url+'">login</a> to get more access during shopping period.' + tooltip_link + '</p></div>';

var is_course = (course_id > 0);
var user_enrolled = false;
var is_shopper = false;
var is_teacher = false;
var is_student = false;

/**
 * Create the div that will hold the shoping banner
 * @type {html element}
 */
var shopping_banner = jQuery('<div/>', {
  id: 'course-shopping',
  class: 'tltmsg'
});

/**
 * Are we on an admin page
 * @type {boolean}
 */
var on_admin_page = ((window.location.pathname).indexOf('settings') != -1);

/**
 * Are we on the speed grader page
 * @type {boolean}
 */
var on_speed_grader_page = ((window.location.pathname).indexOf('speed_grader') != -1);

/**
 * Are we on the submissions page
 * @type {boolean}
 */
var on_submissions_page = ((window.location.pathname).indexOf('submissions') != -1);

/**
 * Are we on any of the special pages described above
 * @type {boolean}
 */
var on_special_page = on_admin_page || on_speed_grader_page || on_submissions_page;

/**
 * check to see if the '#unauthorized_message' is being rendered  and only proceed
 * with additional checks to show shopping messages if authorized
 * @type {boolean}
 */
var is_unauthorized_message_shown = $('#unauthorized_message').length > 0 ? false : true;

/**
 *  get the course number for the canvas course
 * @returns {number} course_id
 */
function get_course_number() {
  var page_url = window.location.pathname;
  var pat = /\/courses\/(\d+)/g;
  var match = pat.exec(page_url);
  if (match) {
    course_id = match[1];
    return course_id;
  }
  return 0;
}

/**
 * Return the user id from the api data
 * @param canvas_user_api_data
 * @returns {string} user_id
 */
function get_sis_user_id(canvas_user_api_data) {
  var user_id = null;
  if (canvas_user_api_data) {
    if (canvas_user_api_data['sis_user_id'] && canvas_user_api_data['sis_user_id'].trim()) {
      user_id = canvas_user_api_data['sis_user_id'].trim();
    } else if (canvas_user_api_data['login_id'] && canvas_user_api_data['login_id'].trim()) {
      user_id = canvas_user_api_data['login_id'].trim();
    }
  }
  return user_id;
}

/**
 * Check if the course workflow state is 'available'
 * @param course_workflow
 * @returns {boolean}
 */
function is_course_available(course_workflow) {
  return course_workflow.localeCompare('available') == 0;
}

/**
 * Check if the term id is in the allowed terms list
 * @param term_id
 * @returns {boolean}
 */
function is_term_allowed(term_id, allowed_terms) {
  return jQuery.inArray(term_id, allowed_terms) > -1;
}

/**
 * Get the banner text for students and guests
 * @returns {string} student_message_text
 */
function shopping_get_student_banner_text() {
  var student_message_text = '<h1>All Harvard ID holders can view this course site during shopping ' +
    'period. ' + tooltip_link + '</h1><p>Your contributions will be visible to other students who ' +
    'are also shopping this course.</p>';
  return student_message_text;
}

/**
 * Get the banner text for shoppers
 * @param remove_shopper_url
 * @returns {string} shopper_message_text
 */
function shopping_get_shopper_banner_text(remove_shopper_url) {
  var shopper_message_text = '<div class="shop-msg-left"><h1>This course has been added to your shopping ' +
    'list ' + tooltip_link + '</h1><p>This means that you can receive notifications, join discussions, ' +
    'watch lecture videos, and upload assignments during shopping period. Your contributions will be ' +
    'visible to other students who are also shopping this course. You will be removed from this course ' +
    'at the end of shopping period unless you officially enroll through the Registrar’s office.' +
    '</p></div><div class="shop-btn-right">' +
    '<a class="btn btn-small btn-primary" href="' + remove_shopper_url + '">Remove Course</a></div>';
  return shopper_message_text;
}

/**
 * Get the banner text for authenticated users (previously called viewers)
 * @param add_shopper_url
 * @returns {string} viewer_message_text
 */
function shopping_get_viewer_banner_text(add_shopper_url) {
  var viewer_message_text = '<div class="shop-msg-left"><h1>Students: do you want to add this course to ' +
    'your shopping list?' + tooltip_link + '</h1><p>Click the Add Course button to receive ' +
    'notifications, join discussions, watch lecture videos, and upload assignments. You must enroll ' +
    'through the Registrar’s office to be officially enrolled as a Student in this course.' +
    '</p></div><div class="shop-btn-right">' +
    '<a class="btn btn-small btn-primary" href="' + add_shopper_url + '">Add Course</a></div>';
  return viewer_message_text;
}

/**
 * Get the banner text for teachers
 * @returns {string} shopping_is_active_message
 */
function shopping_get_is_active_banner_text() {
  var shopping_is_active_message = '<h1>Your current class list may include Shoppers. ' + tooltip_link +
    '</h1><p>All Harvard ID holders can view this course site during shopping period. Students ' +
    'can choose to add themselves as Shoppers to participate in discussions, upload assignments, watch ' +
    'lecture videos, and receive notifications for this course before they are officially enrolled. ' +
    'Student contributions will be visible to other students who are also shopping this course. At the ' +
    'end of shopping period, Shoppers who have not officially enrolled as Students or Guests in the ' +
    'course through the Registrar’s office will be removed from the class list.</p>';
  return shopping_is_active_message;
}