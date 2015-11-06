;((function() {

  function inPath(substring) {
    return window.location.pathname.indexOf(substring);
  }

  function onCourseInfoIframePage() {
    if (inPath('syllabus') || inPath('pages')) {
      return $('div#content').find('iframe[title="Course Info"]').length;
    }
    return false;
  }

  // If we're on a page with the course info iframe, set up bidirectional
  // messaging to keep iframe size in sync with embedded document size
  ((function init() {
    if (onCourseInfoIframePage()) {
      require(['jquery', 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.1/iframeResizer.min.js'], function() {
        $('iframe[title="Course Info"]').iFrameResize({log: true});
      });
    }
  })());

})());
