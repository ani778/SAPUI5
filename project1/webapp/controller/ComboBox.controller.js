sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
"use strict";

return Controller.extend("project1.controller.HelloDialog", {

    onInit: function () {

        // set explored app's demo model on this sample
        var oModel = new JSONModel(sap.ui.require.toUrl("./localService/mockdata/SubprojectTypes.json"));
        console.log('__',oModel)
        this.getView().setModel(oModel);
    },
    onCloseDialog() {
        this.byId("helloDialog").close();
    },
});
});