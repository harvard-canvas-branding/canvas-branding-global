
function isTermDropdownPresent(){
  termDropdown = $('select[name="enrollment_term_id"]');
  return termDropdown.length > 0;
}

function isTermTablePresent(){
  termTable = $('table#terms');
  return termTable.length > 0;
}

function sortTermDropdown(){
  var termSelect = $('select[name="enrollment_term_id"]');
  var selectedOption = $(termSelect).val();
  var termSelectList = $('option', termSelect);
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
  $(termSelect).html(newList).val(selectedOption);

  //$('select[name="enrollment_term_id"] option:eq(0)').prop('selected',true);
}

function sortTermTable(){
  var termRowList = $('table#terms tbody tr.term').get();
  var re_letter = /^[A-Za-z]/;
  var re_number = /^[0-9]/;
  var topList = new Array;
  var bottomList = new Array;

  for (var i=0; i < termRowList.length; i++) {
    if (termRowList[i].getElementsByClassName('name')[0].innerHTML.match(re_number)) {
      topList.push(termRowList[i]);
    }
    else {
      bottomList.push(termRowList[i]);
    }
  }

  var newList = topList.sort(function(a,b){
      var alabel = a.getElementsByClassName('name')[0].innerHTML;
      var blabel = b.getElementsByClassName('name')[0].innerHTML;

      return (alabel >= blabel) ? -1 : 1;
    }).concat(
      bottomList.sort(function(a,b){
        var alabel = a.getElementsByClassName('name')[0].innerHTML;
        var blabel = b.getElementsByClassName('name')[0].innerHTML;
        return (alabel >= blabel) ? 1 : -1;
      })
    );

  $('table#terms').children('tbody').append(newList);

}

$(document).ready(function() {
  if (isTermDropdownPresent()) {
    sortTermDropdown();
  }
  if (isTermTablePresent()) {
    sortTermTable();
  }
});
