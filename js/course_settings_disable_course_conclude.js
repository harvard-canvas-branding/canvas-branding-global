function addCourseConcludeButtonDisabledMessage() {
  var msg = '(Please contact your local academic support staff to conclude the course)';
  var $concludeButton = $("a[class~='btn'][href$='event=conclude']");
  $concludeButton.addClass('conclude_course_link');
  $concludeButton.append('<p><em>' + msg + '</em></p>');
}

function addCourseConcludeDateDisabledMessage() {
  var msg = '(Please contact your local academic support staff to change the course conclude date)';
  $('#course_conclude_at').closest('tr').find('div.aside').after('<p><em>' + msg + '</em></p>');
}

function disableCourseConcludeButton() {
  var $concludeButton = $("a[class~='btn'][href$='event=conclude']");
  $concludeButton.attr('disabled', true);
}

function disableCourseConcludeDate() {
  var $concludeDateUIComponents = $('#course_conclude_at').closest('tr').find('div, i, input, button');
  $concludeDateUIComponents.addClass("selection-disabled").attr("disabled", true);
}

function initHUGlobal() {
  var reCourseSettingsPage = /courses\/.+?\/settings/;
  var windowUrl = window.location.pathname;
  var onCourseSettingsPage = (windowUrl.search(reCourseSettingsPage) != -1);

  if (onCourseSettingsPage) {
    disableCourseConcludeButton();
    addCourseConcludeButtonDisabledMessage();

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
        }
      })
    });

    var $courseConcludeAt = $('#course_conclude_at');
    if ($courseConcludeAt) {
      classAttrObserver.observe($courseConcludeAt.get(0), {
        childList: false,
        subtree: false,
        attributes: true,
        characterData: false,
        attributeFilter: ['class']
      });
    }
  }
}

$(document).ready(initHUGlobal);
