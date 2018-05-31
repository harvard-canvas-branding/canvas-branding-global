function sortTermDropdown(){
  var optGroupList = $('select').first().find('optgroup');

  for (var i=0; i < optGroupList.length; i++) {
      var termList = optGroupList.eq(i).find('option');

      termList.sort(function(a,b){
          return (a.label >= b.label) ? -1 : 1;
      });
      optGroupList.eq(i).html(termList);
  }
}

function sortTermTable(){
  var termRowList = $('table#terms tbody tr.term').get();
  var re_letter = /^[A-Za-z]/;
  var re_number = /^[0-9]/;
  var topList = new Array;
  var bottomList = new Array;

  for (var i=0; i < termRowList.length; i++) {
    if (termRowList[i].getElementsByClassName('name')[0].innerHTML.match(re_number)) {
      // all of the term labels that start with a number are at the top, sorted descending
      topList.push(termRowList[i]);
    }
    else {
      // term labels that start with a letter are at the bottom, sorted ascending
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
    if ($('table#terms').length > 0) {
        sortTermTable();
    }
});

// Wait until all ajax call have been completed prior to sorting
$(document).ajaxStop(function () {
    // If we are on the courses page, sort the terms
    if ($('[data-automation="courses list"]').length > 0) {
        sortTermDropdown();
    }

});
