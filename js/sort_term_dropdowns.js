
function isTermDropdownPresent(){
  $termDropdown =$('select[name="enrollment_term_id"]');
  return $termDropdown.length > 0;
}

function sortTermDropdown(){
  var selectList = $('select[name="enrollment_term_id"] option');

  var re_letter = /^[A-Za-z]/;
  var re_number = /^[0-9]/;
  selectList.sort(function(a,b){
      // 'All Terms' at the top; other labels beggining with a letter at the end
      if (a.label == 'All Terms') {
        return -1;
      }
      if ( a.label.match(re_letter) && b.label.match(re_number) ) {
        return 1;
      }
      if ( a.label.match(re_number) && b.label.match(re_letter) ) {
        return -1;
      }
      return (a.label >= b.label) ? -1 : 1;
  });
  $('select[name="enrollment_term_id"]').html(selectList);
}

function initSortTermDropdown() {
  if (isTermDropdownPresent()) {
    sortTermDropdown();
  }
}

$(document).ready(initSortTermDropdown);
