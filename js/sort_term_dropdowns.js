
function isTermDropdownPresent(){
  $termDropdown =$('select[name="enrollment_term_id"]');
  return $termDropdown.length > 0;
}

function sortTermDropdown(){
  var termSelectList = $('select[name="enrollment_term_id"]');

  var re_letter = /^[A-Za-z]/;
  var re_number = /^[0-9]/;

  var topList = new Array;
  var middleList = new Array;
  var bottomList = new Array;

  for (var i=0; i < termSelectList.options.length; i++) {
    if (termSelectList.options[i].label == 'All Terms') {
      topList.push(termSelectList.options[i]);
    }
    else if (termSelectList.options[i].label.match(re_letter)) {
      bottomList.push(termSelectList.options[i]);
    }
    else {
      middleList.push(termSelectList.options[i])
    }
  }

  var newList = new Array;
  newList += topList;
  newList += middleList.sort(function(a,b){
    return (a.label >= b.label) ? -1 : 1;
  });
  newList += bottomList.sort(function(a,b){
    return (a.label >= b.label) ? -1 : 1;
  });

  $('select[name="enrollment_term_id"]').html(newList);
}

function initSortTermDropdown() {
  if (isTermDropdownPresent()) {
    sortTermDropdown();
  }
}

$(document).ready(initSortTermDropdown);
