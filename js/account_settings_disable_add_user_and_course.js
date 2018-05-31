function isAddUserButtonEnabled(){
    return !$('[aria-label="Add people"]').hasClass('disabled');
}

function isAddCourseButtonEnabled(){
    return !$('[aria-label="Create new course"]').hasClass('disabled');
}

function disableAddUserButton(){
    $('[aria-label="Add people"]').first().addClass('Button disabled');
}

function disableAddCourseButton(){
    $('[aria-label="Create new course"]').first().addClass('Button disabled');
}

function initDisableAddUserCourse() {
    if ($("body[class*=context-account_]")) {
        disableAddCourseButton();
        disableAddUserButton();
    }
}

$(document).ready(initDisableAddUserCourse);
