$(document).ready(function(e) {
    /* NOTE: with the current (as of 2016-04-06) styling on the canvas UI,
     * the below copy needs to be wrapped in a div to avoid having the spacing
     * in between it getting squished down to nothing when the viewport is wide
     * enough.  also, wrapping things in <p> tags doesn't get you multiple
     * lines
     */
    var harvardCopy = 
        '<div>Copyright &copy; 2016 The President and Fellows of Harvard College | ' +
        '<a href="https://wiki.harvard.edu/confluence/display/canvas/Harvard+Privacy+Policy+for+Canvas" id="privacy_policy_link">Privacy Policy</a> | ' +
        '<a href="https://wiki.harvard.edu/confluence/display/canvas/Harvard+Acceptable+Use+Policy+for+Canvas" id="acceptable_use_policy_link">Acceptable Use Policy</a>' +
        '</div>';
    $('footer').html(harvardCopy);
});
