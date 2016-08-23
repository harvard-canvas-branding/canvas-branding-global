
/*
  Hide the two help menu items that we can't control via the UI
  Everything else will be controlled via the UI
*/
function removeUnwantedHelpOptions() {
  $('div#help_tray ul li a:contains(Ask the Community)').parent().hide();
  $('div#help_tray ul li a:contains(Submit a Feature Idea)').parent().hide();
}

/*
    The help options do not exist on the page until the help button is clicked and the ensuing ajax call returns.
    The observer will watch the page and look for new nodes that match the help_tray selector. When one is found
    the method will remove the unwanted list items.
*/
function initHelpMenu(){

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var helpMenuObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            var $target = $(mutation.target);
            if ($target.find('#help_tray').length != 0) {
                removeUnwantedHelpOptions()
                // $('#help-dialog-options').empty();
                // addNewHelpItems(menuOptions);
                // $('#help-dialog-options').css('display', 'block');
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
