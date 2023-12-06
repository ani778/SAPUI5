sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/ViewSettingsDialog",
    "sap/m/ViewSettingsItem",
    "sap/ui/core/UIComponent",
    "project1/controller/BaseController"
], function(Controller, JSONModel,MessageToast,Filter,FilterOperator,Sorter,ViewSettingsDialog,ViewSettingsItem,UIComponent,BaseController) {
    "use strict";
 
    return BaseController.extend("project1.controller.Table", {
    onInit() {
        this._oTable = this.byId("friendsTable");
        this._oVSD = null;
        this._sSortField = null;
        this._bSortDescending = false;
        this._aValidSortFields = ["InstructionId", "InstructionShort", "ChUser"];
       
        var oModel = new JSONModel("./localService/mockdata/Instructions.json");
        this.getView().setModel(oModel, "results");

        var oModel_2 = new JSONModel("./localService/mockdata/SubprojectTypes.json");
        this.getView().setModel(oModel_2, "comboBox");

        this.getRouter().getRoute("table").attachPatternMatched(this.onObjectMatched, this);

        this._initViewSettingsDialog();

        this._oTable.getBinding("items").attachChange(this._onTableChange, this);
     },

     _onTableChange: function () {
        
    var oTable = this.byId("friendsTable");
    var oBinding = oTable.getBinding("items");
    var iItemCount = oBinding.getLength();

    var oModel = this.getView().getModel("results");
    oModel.setProperty("/itemCount", iItemCount);
    },

    formatInstructionsTitle: function (iItemCount) {
            return `Instructions Title (${iItemCount})`;
    },

     onObjectMatched: function (oEvent) {},
    
     onPress(oEvent) {
        const oItem = oEvent.getSource();
        const oRouter = this.getRouter();
        oRouter.navTo("detail",{id: window.encodeURIComponent(oItem.getBindingContext("results").getPath().substr(1))});
    },
    
    _initViewSettingsDialog : function () {
        this._oVSD = new ViewSettingsDialog("vsd", {
            confirm: function (oEvent) {
                var oSortItem = oEvent.getParameter("sortItem");
                this._applySorter(oSortItem.getKey(), oEvent.getParameter("sortDescending"));
            }.bind(this)
        });

        this._oVSD.addSortItem(new ViewSettingsItem({
            key: "InstructionId",
            text: "ID",
            selected: true
        }));

        this._oVSD.addSortItem(new ViewSettingsItem({
            key: "InstructionShort",
            text: "Instructions (short)",
            selected: false
        }));

        this._oVSD.addSortItem(new ViewSettingsItem({
            key: "ChUser",
            text: "Last Changed By",
            selected: false
        }));
},

    onOpenDialog() {
        this.pDialog ??= this.loadFragment({
            name: "project1.fragment.HelloDialog"
        });
        this.pDialog.then((oDialog) => oDialog.open());
    },

    onCreate() {
        var sName = this.getView().getModel().getProperty("/name");
        var sText = this.getView().getModel().getProperty("/textarea");

        this._saveName(sName,sText);

        var oInput = this.byId("name"),
        oTextArea = this.byId("instructionTextarea");

        oInput.setValue("");
        oTextArea.setValue("");
        this.byId("helloDialog").close();
    },

    _saveName: function (sName,sText) {
        var oList = this.byId("friendsTable"),
            oBinding = oList.getBinding("items");

        var lastItemId = oBinding.oList[oBinding.oList.length - 1].InstructionId
        var nextId = String(parseInt(lastItemId, 10) + 1).padStart(lastItemId.length, '0');

          function createDefaultNamesObject(sName, sText, nextId) {
            return {
                __metadata: {},
                ToSubprojectTypeInstructions: {},
                InstructionLong: "",
                InstructionShort: "",
                InstructionId: nextId,
                ChUser: "",
                ChDate: "",
                ...sName && { InstructionShort: sName },
                ...sText && { InstructionLong: sText }
            };
        } 
        var aNames = createDefaultNamesObject(sName, sText, nextId);
    
        var currentObject = oBinding.getModel("results").getProperty("/");

    currentObject.results.push(aNames);

    oBinding.getModel("results").setProperty("/", currentObject);
        console.log('DATA:', currentObject)
        oBinding.refresh();

        return oBinding.oList
      },

    onCloseDialog() {
        this.byId("helloDialog").close();
    },

    onSort() {
        this._oVSD.open();
    },

    _syncViewSettingsDialogSorter : function (sSortField, bSortDescending) {
        this._oVSD.setSelectedSortItem(sSortField);
        this._oVSD.setSortDescending(bSortDescending);
    },
   
    onFilterPosts(oEvent) {
        const aFilter = [];
        const sQuery = oEvent.getParameter("query");
        if (sQuery) {
            aFilter.push(new Filter("InstructionShort", FilterOperator.Contains, sQuery));
        }

        const oList = this.byId("friendsTable");
        const oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
    },
	_applySorter : function (sSortField, sortDescending){
        var bSortDescending, oBinding, oSorter;
        if (sSortField && this._aValidSortFields.indexOf(sSortField) > -1) {

            if (typeof sortDescending === "string") {
                bSortDescending = sortDescending === "true";
            } else if (typeof sortDescending === "boolean") {
                bSortDescending =  sortDescending;
            } else {
                bSortDescending = false;
            }

            if (this._sSortField && this._sSortField === sSortField && this._bSortDescending === bSortDescending) {
                return;
            }

            this._sSortField = sSortField;
            this._bSortDescending = bSortDescending;
            oSorter = new Sorter(sSortField, bSortDescending);

            this._syncViewSettingsDialogSorter(sSortField, bSortDescending);

            oBinding = this._oTable.getBinding("items");
            oBinding.sort(oSorter);
        }
    },
    });
 });