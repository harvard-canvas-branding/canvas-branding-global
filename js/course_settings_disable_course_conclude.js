function addCourseConcludeButtonDisabledMessage() {
  var msg = '(Please contact your local academic support staff to conclude the course)';
  var $concludeButton = $("a[class~='Button'][href$='event=conclude']");
  $concludeButton.addClass('conclude_course_link');
  $concludeButton.append('<p><em>' + msg + '</em></p>');
}

function addCourseConcludeDateDisabledMessage() {
  var msg = '(Please contact your local academic support staff to change the course conclude date)';
  if ( $('#course_conclude_at').closest('tr').find('p').length == 0 ) {
    $('#course_conclude_at').closest('tr').find('div.aside').after('<p><em>' + msg + '</em></p>');
  }
}

function addCourseUnconcludeButtonDisabledMessage() {
  var msg = '(Please contact your local academic support staff to un-conclude this course)'
  var $unconcludeButton = $("form[action$='unconclude']").find('button');
  $unconcludeButton.addClass('unconclude_course_link');
  $unconcludeButton.append('<p><em>' + msg + '</em></p>');
}

function disableCourseConcludeButton() {
  var $concludeButton = $("a[class~='Button'][href$='event=conclude']");
  $concludeButton.attr('disabled', true);
}

function disableCourseUnconcludeButton() {
  var $unconcludeButton = $("form[action$='unconclude']").find('button');
  $unconcludeButton.attr('disabled', true);
}

function disableCourseConcludeDate() {
  var $concludeDateUIComponents = $('#course_conclude_at').closest('tr').find('div, i, input, button');
  $concludeDateUIComponents.addClass("selection-disabled").attr("disabled", true);
}

function isConcludeButtonPresent(){
    $concludeBtn =$("a[class~='Button'][href$='event=conclude']");
    if ($concludeBtn.length > 0 )
        return true;
    return false;
}

function initHUGlobal() {
  var reCourseSettingsPage = /courses\/.+?\/settings/;
  var windowUrl = window.location.pathname;
  var onCourseSettingsPage = (windowUrl.search(reCourseSettingsPage) != -1);

  if (onCourseSettingsPage) {
    if (isConcludeButtonPresent()) {
        disableCourseConcludeButton();
        addCourseConcludeButtonDisabledMessage();
    }else {
        disableCourseUnconcludeButton();
        addCourseUnconcludeButtonDisabledMessage();
    }
    


    // datepicker is not always available on document.ready(), and doesn't
    // trigger mutations when added to DOM, so we have to track when it gets
    // added by looking at its associated input field
    var classAttrObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        var $target = $(mutation.target);
        if ($target.not('.datepickerDisabled').hasClass('hasDatepicker')) {
          $target.addClass('datepickerDisabled');
          disableCourseConcludeDate();
          addCourseConcludeDateDisabledMessage();
          classAttrObserver.disconnect();
        }
      })
    });

    // content is the closest parent that's reliably availble on document.ready()
    var $content = $('#content');
    if ($content.length > 0) {
      classAttrObserver.observe($content.get(0), {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: false,
        attributeFilter: ['class']
      });
    }
  }
}

$(document).ready(initHUGlobal);
