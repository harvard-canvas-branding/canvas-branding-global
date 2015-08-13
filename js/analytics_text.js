var p = window.location.pathname.split("/");
var filename = p[p.length-1];

if(filename == "analytics") {

  var guidance_text = '<p id="guidance_text">The Faculty Oversight Committee on the Access to Electronic Information provides'+ 
    ' <a href="https://wiki.harvard.edu/confluence/display/canvas/Electronic+Information+in+Canvas" target="_blank">guidance to faculty</a>'+
    ' on using these analytics.</p>';


  $('.course_graphs').before(guidance_text);

}
