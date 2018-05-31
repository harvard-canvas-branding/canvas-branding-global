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
    var msg = '(Please contact your local academic support staff to un-conclude this course)';
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
    return $("a[class~='Button'][href$='event=conclude']").length > 0;
}

function sortRoleDropdown(){
    var roleSelect = $('select').first();
    var optList = roleSelect.find('option');

    optList.sort(function(a,b){
        console.log(a.label);
        return (a.label >= b.label) ? 1 : -1;
    });
    roleSelect.html(optList);
}

function initHUGlobal() {
    var reCourseSettingsPage = /courses\/.+?\/settings/;
    var windowUrl = window.location.pathname;
    var onCourseSettingsPage = (windowUrl.search(reCourseSettingsPage) != -1);
    if (onCourseSettingsPage) {
        if (isConcludeButtonPresent()) {
            disableCourseConcludeButton();
        } else {
            disableCourseUnconcludeButton();
            addCourseUnconcludeButtonDisabledMessage();
        }
    }

    // If we are on the People page, sort the role drop down
    if ($('[aria-label="Add people"]').length > 0) {
        sortRoleDropdown();
    }

    // Not all elements are available upon document.ready()
    // MutationObserver will observe any changes to the DOM and changes can be made for these new elements
    var classAttrObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // If the + Course button is present and enabled, disable the button
            if (isAddCourseButtonEnabled()) {
                disableAddCourseButton();
            }
            // If the + People button is present and enabled, disable the button
            if (isAddUserButtonEnabled()) {
                disableAddUserButton();
            }
            // Check if the DatePicker is present and if so disable it
            var $target = $(mutation.target);
            if ($target.not('.datepickerDisabled').hasClass('hasDatepicker')) {
                $target.addClass('datepickerDisabled');
                disableCourseConcludeDate();
                addCourseConcludeDateDisabledMessage();
                classAttrObserver.disconnect();
            }
        })
    });

    // content is the closest parent that's reliably available on document.ready()
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

$(document).ready(initHUGlobal);
