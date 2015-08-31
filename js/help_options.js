
/*
    structure to hold the new menu options. Since the menu items have virtually no selectors in canvas
    it's easier to just empty the list and add new items.
*/
var menuOptions = [
    {
        "text" : "Course-related questions",
        "subtext" : "Ask the teaching staff of your course(s) for assistance",
        "url": "#teacher_feedback"
    },
    {
        "text" : "Canvas support from Harvard ",
        "subtext" : "Email your local academic support staff",
        "url": "http://bit.ly/18o14Fn"
    },
    {
        "text" : "Canvas 24x7 chat",
        "subtext" : "Live chat with Canvas Support",
        "url": "https://secure.livechatinc.com/licence/2695732/open_chat.cgi?groups=149"
    },
    {
        "text" : "Canvas 24x7 email support",
        "subtext" : "Email Canvas Support for a quick reply",
        "url": "#create_ticket"
    },
    {
        "text" : "Canvas 24x7 hotline",
        "subtext" : "Call Canvas Support at 1-844-326-4466 for immediate assistance",
    },
    {
        "text" : "Canvas Guides",
        "subtext" : "Find answers to common questions",
        "url": "https://community.canvaslms.com/community/answers/guides/"
    },
];

/*
    add the new items to the menu
*/
function addNewHelpItems(menuOptions){

    $.each(menuOptions, function(idx, obj) {
        if (obj.url) {
            $('#help-dialog-options').append(
                $('<li>').append(
                    $('<a>')
                        .attr('href', obj.url)
                        .attr('target', '_blank')
                        .append($('<span>').attr('class', 'text').append(obj.text))
                        .append($('<span>').attr('class', 'subtext').append(obj.subtext))
                )
            );
        } else {
            $('#help-dialog-options').append(
                $('<li>').append(
                    $('<span>')
                        .attr('class', 'info-no-url')
                        .append($('<span>').attr('class', 'text').append(obj.text))
                        .append($('<span>').attr('class', 'subtext').append(obj.subtext))
                )
            );
        }
    });
}

/*
    The help options do not exist on the page until the help button is clicked and the ensuing ajax call returns.
    The observer will what the page and look for new nodes that match the help-dialog selector. When one is found
    the method will empty the list, add the new help options, and display the menu to the user.
*/
function initHelpMenu(){

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var helpMenuObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            var $target = $(mutation.target);
            if ($target.find('#help-dialog-options').length != 0) {
                $('#help-dialog-options').empty();
                addNewHelpItems(menuOptions);
                $('#help-dialog-options').css('display', 'block');
            }
        });
    });

    var $config = {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
    };

    helpMenuObserver.observe(document.body, $config);

}

$(document).ready(initHelpMenu);
