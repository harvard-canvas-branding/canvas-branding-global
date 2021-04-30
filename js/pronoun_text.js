
function initAddPronounText() {
  var windowUrl = window.location.pathname;
  var onProfileSettingsPage = (windowUrl.search(/\/profile\/settings/) != -1);

  if (onProfileSettingsPage) {
    var textSpan = $( "#pronouns" ).parent().children().last();

    textSpan.html("\
    <br/>This pronoun will appear after your name when enabled.\
    If you would like to do so, use this section to identify, \
    change, or delete your chosen personal pronouns. Currently \
    Canvas requires users to choose from a limited \
    prepopulated list of personal pronouns. We respect that \
    language is constantly evolving and members of our community \
    should be able to be called and describe their identity \
    however they choose, so we are working to enable that option \
    within Canvas. To learn more about gender, identity, \
    or pronouns and to provide feedback, visit: \
    <a href=\"https://dib.harvard.edu/gender-pronouns\">\
    https://dib.harvard.edu/gender-pronouns</a>.\
    ");

    $( "#pronouns" ).parent().parent().children("th").css("vertical-align", "top");

  }
}

$(document).ready(initAddPronounText);
