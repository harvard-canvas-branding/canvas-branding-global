// source: TLT Canvas Liaison FAQ
var huToolVisibilityRestricted = [
  // Course-level
  "A/B Testing Tool",
  "Manage People",
  "Manage Sections",
  "Course Emailer",
  "Import iSites Content",
  "Manage Course",
  "HUIT Accessibility",
  "Accessibility Dashboard"
];
function huFuzzyVisUpdate(tool){
	var element = $("div[id='left-side'] a[class^='context_external_tool']:contains('"+ tool + "')");
	//modify the title and append the icon
	element.attr("title", "Not visible to students");
	return element.append('<i class="nav-icon icon-off" title="Not visible to students"  aria-hidden="true" role="presentation"></i>')
}

function huExactVisUpdate(tool){
	var element = $("div[id='left-side'] a[class^='context_external_tool']")
    .filter(function(){ return $(this).text() === tool });
	//modify the title and append the icon
	element.attr("title", "Not visible to students");
  	return element.append('<i class="nav-icon icon-off"  title="Not visible to students" aria-hidden="true" role="presentation"></i>')
}

/*
 Changes the link style of a specified list of custom tools in the left-hand nav
  to indicate they are not visible to students (current Canvas behavior is to show
  an icon to the right of the text).
  toolList: Array of strings representing the link text of all
            tools that need to be marked as visible only to admins.
  exactMatch: If true, will only match tool links with the exact names in toolList.
              If any other value (or if not provided an argument), will match any
              tool whose link text begins with one of the toolList values.
 */
function huUpdateCustomToolsVisibilityIndicator(toolList, exactMatch){
  var updateFunction = ((exactMatch === true) ? huExactVisUpdate : huFuzzyVisUpdate);
  $.each(toolList, function(index, tool) { updateFunction(tool); });
}

$(document).ready(huUpdateCustomToolsVisibilityIndicator(huToolVisibilityRestricted));
