sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
 ], function(Controller, JSONModel) {
    "use strict";
 
    return Controller.extend("project1.controller.InvoiceList", {
    onInit: function() {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
        var oModel = new JSONModel("./localService/mockdata/Instructions.json");
        this.getView().setModel(oModel, "results");
     },

     onObjectMatched(oEvent) {
      console.log('&&')
		this.getView().bindElement({
			path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").id),
			model: "results"
		});
	},
    });
 });
 