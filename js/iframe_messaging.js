;((function() {

  acceptedOrigins = [
    'https://localhost:8000',
    'https://canvas-course-info.dev.tlt.harvard.edu',
    'https://canvas-course-info.qa.tlt.harvard.edu',
    'https://canvas-course-info.stage.tlt.harvard.edu',
    'https://canvas-course-info.tlt.harvard.edu'
  ];

  function changeIframeHeights(iframeHref, newHeight) {
    // expects newHeight to be a string that can be applied to a style attribute
    // e.g. '100px' or '30em'
    if (!iframeHref || !newHeight) {
      console.log('Resize message missing href or height parameter');
      return;
    }

    if (!newHeight.length || newHeight.length < 3) {
      console.log('Resize message contains invalid height parameter:', newHeight);
      return;
    }

    try {
      console.log('resizing matching iframes to', newHeight);
      var iframes = findIframesByHref(iframeHref);
      if (iframes.length > 0) {
        iframes.forEach(function(iframe) {
          iframe.style.height = newHeight;
        });
      }
      else {
        console.log('Could not find any iframes with href', iframeHref);
      }
    } catch(e) {
      console.log('Caught error:', e, e.stack);
    }
  }

  function findIframesByHref(href) {
    var
      iframesNodeList = document.querySelectorAll('iframe'),
      iframes = Array.prototype.slice.call(iframesNodeList);
    return iframes.filter(function(iframe) {
      return iframe.src === href;
    });
  }

  function handleMessage(e) {
    if (acceptedOrigins.indexOf(event.origin) == -1) {
      console.log('discarding msg received from', event.origin);
      return;
    }

    if (!e.data || !e.data.request) {
      return;
    }

    switch(e.data.request) {
      case 'changeHeight':
        changeIframeHeights(e.data.href, e.data.height);
        break;
    }
  }

  function inPath(substring) {
    return window.location.pathname.indexOf(substring);
  }

  function onCourseInfoIframePage() {
    if (inPath('syllabus') || inPath('pages')) {
      return $('div#content').find('iframe[title="Course Info"]').length;
    }
    return false;
  }

  // if we're on a page with the course info iframe, prepare for a resize
  // message coming from the embedded document
  ((function init() {
    if (onCourseInfoIframePage()) {
      window.addEventListener('message', handleMessage, false);
    }
  })());

})());
