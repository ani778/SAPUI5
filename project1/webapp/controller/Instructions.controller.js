sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
 ], (Controller, Filter, FilterOperator) => {
    "use strict";
 
    return Controller.extend("project1.controller.HelloPanel", {
    //    onShowHello() {
    //       // read msg from i18n model
    //       const oBundle = this.getView().getModel("i18n").getResourceBundle();
    //       const sRecipient = this.getView().getModel().getProperty("/recipient/name");
    //       const sMsg = oBundle.getText("helloMsg", [sRecipient]);
 
    //       // show message
    //       MessageToast.show(sMsg);
    //    },
       onOpenDialog() {
        // create dialog lazily
        this.pDialog ??= this.loadFragment({
            name: "project1.view.HelloDialog"
        });
    
        this.pDialog.then((oDialog) => oDialog.open());
    },
    onCloseDialog() {
        // note: We don't need to chain to the pDialog promise, since this event handler
        // is only called from within the loaded dialog itself.
        this.byId("helloDialog").close();
    },

    onFilterPosts: function (oEvent) {

        // build filter array
        var aFilter = [];
        var sQuery = oEvent.getParameter("query");
        if (sQuery) {
            aFilter.push(new Filter("Title", FilterOperator.Contains, sQuery));
        }

        // filter binding
        var oTable = this.byId("table");
        var oBinding = oTable.getBinding("items");
        oBinding.filter(aFilter);
    },

    });
 });