// This script will modify the "Unauthorized" message that users may see if they click through
// to the course home page, but the course hasn't been published yet. The message has been
// modified to be a little more user friendly.
require(['jquery'], function($) {

    /**
     * This function checks to see if the page is in the context of the course.
     *
     * @returns {Boolean} True if it is the course home, otherwise false.
     */
    function is_course_page() {
        return /^\/courses\/\d+/.test(window.location.pathname);
    };

    /**
     * This function modifies the unauthorized message on the page by tweaking
     * the HTML. Here's an example of what the HTML looks like prior to modification:
     *
     * <div id="unauthorized_holder">
     *  <div id="unauthorized_message" class="">
     *      <h2 class="ui-state-error">
     *      Unauthorized
     *      </h2>
     *      <p>
     *      It appears that you don&#x27;t have permission to access this page. Please make sure you&#x27;re authorized to view this content.
     *      If you think you should be able to view this page, please use the &quot;Help&quot; link to notify support of the problem.
     *      </p>
     *  </div>
     * </div>
     *
     * @returns undefined
     */
    function modify_unauthorized_message(msg) {
        var $holder = $('#unauthorized_holder');

        if($holder.length > 0) {
            $holder.find('h2').html(msg.title);
            $holder.find('p').replaceWith(msg.content);
            $holder.find('p:first').css({paddingBottom: 0});
        }
    };


    // Modifies the unauthorized message if present on the course page
    if(is_course_page()) {
        modify_unauthorized_message({
            title: 'Not Available',
            content: '<p>You do not currently have access to view this page. It may be that the site has not yet been published by the teaching staff, or that access to the site is restricted.</p><p>If you think you should have access, please use the "Help" link to contact support.</p>'
        });
    }

});
