function addReferrerPolicy(){
    $('iframe[src*="/course_info/widget.html"]').each(function(){
        $(this).attr('referrerpolicy', 'no-referrer-when-downgrade');
        // setting the iframe src to itself will cause it to be reloaded with the new policy in effect
        $(this).attr('src', $(this).attr('src'));
    });
}

$(document).ready(addReferrerPolicy);
