$(document).ready(function(e) {
    var harvardLogo = "<a class='harvardLogo' href='/'><img src='https://s3.amazonaws.com/tlt-static/canvas/branding/global/images/spacer.gif'></a>";
    $('#header-inner').prepend(harvardLogo);
    
    var harvardCopy = '<p>Copyright &copy; 2015 The President and Fellows of Harvard College</p>';
    harvardCopy += '<p><a href="https://wiki.harvard.edu/confluence/display/canvas/Harvard+Privacy+Policy+for+Canvas" id="privacy_policy_link">Privacy Policy</a> | <a href="https://wiki.harvard.edu/confluence/display/canvas/Harvard+Acceptable+Use+Policy+for+Canvas" id="acceptable_use_policy_link">Acceptable Use Policy</a></p>';
    $('footer').html(harvardCopy);    

});
