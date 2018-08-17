;((function() {

  function onEditablePage() {
    return ($('body').hasClass('syllabus') || $('body').hasClass('pages'));
  }

  // If we're on a page with the course info iframe, set up bidirectional
  // messaging to keep iframe size in sync with embedded document size
  ((function init() {
    if (onEditablePage()) {
      var iframeResizerCDN = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.1/iframeResizer.min.js';
      var courseInfoObserver = new MutationObserver(function (mutations) {
          var $widgets = $('div#content').find('iframe[title="Course Info"]');
          if ($widgets.length > 0) {
            require(['jquery', iframeResizerCDN], function() {
              $widgets.iFrameResize();
              // assumes all iframes were added simultaneously
              courseInfoObserver.disconnect();
            });
          }
      });

      var moConfig = {
        childList: true,
        subtree: true
      };

      courseInfoObserver.observe(document.getElementById('content'), moConfig);
    }
  })());
})());
