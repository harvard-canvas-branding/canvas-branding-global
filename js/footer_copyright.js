$(document).ready(function (e) {
  /* NOTE: with the current (as of 2016-04-06) styling on the canvas UI,
   * the below copy needs to be wrapped in a div to avoid having the spacing
   * in between it getting squished down to nothing when the viewport is wide
   * enough.  also, wrapping things in <p> tags doesn't get you multiple
   * lines
   */
  function addFooterContent() {
    const copyYear = new Date().getFullYear();

    const harvardCopy =
      "<div>***TEST Copyright &copy; 2013-" + copyYear + " The President and Fellows of Harvard College | " +
        '<a href="https://harvard.service-now.com/ithelp?id=kb_article&sys_id=9d718485db0d57cc83a2f3f7bf961902" id="acceptable_use_policy_link" target="_blank">Acceptable Use Policy</a> | ' +
        '<a href="https://accessibility.huit.harvard.edu/digital-accessibility-policy" id="accessibility_link" target="_blank">Accessibility</a> | ' +
        '<a href="https://harvard.service-now.com/ithelp?id=kb_article&sys_id=3373044ddb4d57cc83a2f3f7bf961909" id="privacy_policy_link" target="_blank">Privacy Policy</a>' +
      "</div>";

    // Check for <footer> element on page.
    if ($("footer").length > 0) {
      // Select and replace the HTML content inside all <footer> element with the content of the `harvardCopy`.
      $("footer").html(harvardCopy);
    } else {
      // Create <footer> element.
      const harvardCopy2 =
        '<div id="custom-footer-container">' +
            '<footer role="contentinfo" id="footer" class="ic-app-footer">' +
                harvardCopy +
            "</footer>" +
        "</div>";

      // Append <footer> element to div content-wrapper element and make sure it is visible.
      $("#content-wrapper").append(harvardCopy2);
      $("#footer").css("display", "block");
    }
  }

  addFooterContent();
});
