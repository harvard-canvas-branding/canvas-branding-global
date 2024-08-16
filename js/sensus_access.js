"use strict";

(function () {
	window.SENSUS_CFG = {
		ltiDomain: 'https://inside.sensusaccess.com/',

		clientId: '18750000000000444',
		consumerKey: '2d001db0-adf7-423d-414b-08dbe9f172cb'
	}

	$('<script>').attr('src', SENSUS_CFG.ltiDomain + 'js/canvasui/sensus-main.js').appendTo('body')
})()
