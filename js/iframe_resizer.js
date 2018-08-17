;((function() {

  function onEditablePage() {
    return ($('body').hasClass('syllabus') || $('body').hasClass('pages'));
  }

  var iframeResizerCDN = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.1/iframeResizer.min.js';
  require([iframeResizerCDN]);

  // If we're on a page with the course info iframe, set up bidirectional
  // messaging to keep iframe size in sync with embedded document size
  ((function init() {
    if (onEditablePage()) {
      console.log('on an editable page - look for iframes to resize');

      window.addEventListener("message", receiveMessage, false);
      function receiveMessage(event)
      {
        if (event.origin !== "https://localhost:8000") {
          console.log('bad origin - ignoring: '+event.origin);
          return;
        }

        console.log('got a message from '+event.origin+' with a message of '+event.data);
        // resize the iframes
        var widgets = $('div#content').find('iframe[title="Course Info"]');
        if (widgets.length > 0) {
          widgets.iFrameResize();
          console.log('resized the iframe');
        }
        // ...
      }

      /*
      var courseInfoObserver = new MutationObserver(function (mutations) {
          console.log(mutations);
          var $widgets = $('div#content').find('iframe[title="Course Info"]');
          if ($widgets.length > 0) {
            $widgets.iFrameResize();
            console.log('resized an iframe');
            // assumes all iframes were added simultaneously
            // courseInfoObserver.disconnect();
          }
      });

      var moConfig = {
        childList: true,
        subtree: true
      };

      courseInfoObserver.observe(document.getElementById('content'), moConfig);
      */
    }
  })());
})());
