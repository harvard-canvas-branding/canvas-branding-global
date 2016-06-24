
function isTermDropdownPresent(){
  $termDropdown =$('select[name="enrollment_term_id"]');
  return $termDropdown.length > 0;
}

function sortTermDropdown(){
  var termSelectList = $('select[name="enrollment_term_id"] option');
  var re_letter = /^[A-Za-z]/;
  var re_number = /^[0-9]/;

  var topList = new Array;
  var middleList = new Array;
  var bottomList = new Array;

  for (var i=0; i < termSelectList.length; i++) {
    if (termSelectList[i].label == 'All Terms') {
      topList.push(termSelectList[i]);
    }
    else if (termSelectList[i].label.match(re_letter)) {
      bottomList.push(termSelectList[i]);
    }
    else {
      middleList.push(termSelectList[i])
    }
  }

  var newList = topList.concat(
    middleList.sort(function(a,b){
      return (a.label >= b.label) ? -1 : 1;
    }),
    bottomList.sort(function(a,b){
      return (a.label >= b.label) ? 1 : -1;
    })
  );
  $('select[name="enrollment_term_id"]').html(newList);
  $('select[name="enrollment_term_id"] option:eq(0)').prop('selected',true);
}

function initSortTermDropdown() {
  if (isTermDropdownPresent()) {
    sortTermDropdown();
  }
}

$(document).ready(initSortTermDropdown);
