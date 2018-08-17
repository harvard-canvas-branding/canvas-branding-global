;((function() {

  function onEditablePage() {
    return ($('body').hasClass('syllabus') || $('body').hasClass('pages'));
  }


  // If we're on a page with the course info iframe, set up bidirectional
  // messaging to keep iframe size in sync with embedded document size
  ((function init() {
    if (onEditablePage()) {
      console.log('on an editable page - look for iframes to resize');

      var iframeResizerCDN = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.1/iframeResizer.min.js';
      require([iframeResizerCDN]);

      window.addEventListener("message", receiveMessage, false);
      function receiveMessage(event)
      {
        if (event.origin !== "https://localhost:8000" || event.data !== "resize") {
          return;
        }

        // resize the iframe(s)
        var widgets = $('div#content').find('iframe[title="Course Info"]');
        if (widgets.length > 0) {
          widgets.iFrameResize();
          console.log('resized the iframe');
        }
      }
    }
  })());
})());
