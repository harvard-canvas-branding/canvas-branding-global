/**
 * Common shopping code
 */


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