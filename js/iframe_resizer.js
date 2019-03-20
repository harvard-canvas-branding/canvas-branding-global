;((function() {

  function onEditablePage() {
    return ($('body').hasClass('syllabus') || $('body').hasClass('pages'));
  }


  // If we're on a page with the course info iframe, listen for a message from
  // the iframe that will trigger a resize
 ((function init() {
    if (onEditablePage()) {
      // on an editable page - load the resizer code and listen for a message
      // from the child document so that we know it's ready to be resized

      window.addEventListener("message", receiveMessage, false);
      function receiveMessage(event)
      {

        // check the origin
        var valid_origins = [
          "https://canvas-course-info.dev.tlt.harvard.edu",
          "https://canvas-course-info.qa.tlt.harvard.edu",
          "https://canvas-course-info.tlt.harvard.edu",
          "https://canvas-course-info.local.tlt.harvard.edu",
          "https://canvas-course-info.stage.tlt.harvard.edu",
          "https://local.tlt.harvard.edu:8000"
        ];
        if (!valid_origins.includes(event.origin)) {
          console.log('event origin not valid: '+event.origin);
          return;
        }

        // make sure we have the right event
        if (event.data.message !== "ready_for_resize") {
          console.log('event message incorrect -- ignoring event');
          return;
        }

        // make sure we have an integer height
        if (typeof event.data.height !== 'number') {
        	console.log('event had no height number -- skipping');
        	return;
        }

        // find the correct frame and resize it
        frames = $('iframe');
        if (frames.length > 0) {
          for (var i = 0; i < frames.length; i++) {
            if (frames[i].contentWindow === event.source) {
              frames[i].style.cssText = '';
              frames[i].height = event.data.height;
              frames[i].width = '100%';
              break;
            }
          }
        }
      }
    }
  })());
})());
