// Start SensusAccess LTI Configuration
"use strict";
(function () {
    window.SENSUS_CFG = {
        ltiDomain: 'https://inside.sensusaccess.com/',
        clientId: '48600000000000247',
        consumerKey: '7a3c777f-13ee-4734-9323-08dc49dd7ab2'
    }
    $('<script>').attr('src', SENSUS_CFG.ltiDomain + 'js/canvasui/sensus-main.js').appendTo('body')
})();
// End SensusAccess LTI Configuration
