sap.ui.define([
	"../localService/mockserver"
], (mockserver) => {
	"use strict";
    console.log('HI')

	// initialize the mock server
	mockserver.init();
	// initialize the embedded component on the HTML page
	sap.ui.require(["sap/ui/core/ComponentSupport"]);
});
