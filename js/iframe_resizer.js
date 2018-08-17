;((function() {

  function onEditablePage() {
    return ($('body').hasClass('syllabus') || $('body').hasClass('pages'));
  }


  // If we're on a page with the course info iframe, set up bidirectional
  // messaging to keep iframe size in sync with embedded document size
  ((function init() {
    if (onEditablePage()) {
      // on an editable page - load the resizer code and listen for a message
      // from the child document so that we know it's ready to be resized
      var iframeResizerCDN = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.1/iframeResizer.min.js';
      require([iframeResizerCDN]);

      window.addEventListener("message", receiveMessage, false);
      function receiveMessage(event)
      {
        // make sure we have the right event
        if (event.data !== "ready_for_resize") {
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
