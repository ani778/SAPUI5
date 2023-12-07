sap.ui.define([
	'sap/ui/core/mvc/Controller',
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller,History, JSONModel) {
	"use strict";
 
	return Controller.extend("project1.controller.RichTextEditorRemoveButtons", {
		
	   onInit: function () {
		const oRouter = this.getOwnerComponent().getRouter();
		oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
		this.initRichTextEditor(true);
        var oModel = new JSONModel("./localService/mockdata/Instructions.json");

		oModel.attachRequestCompleted(function() {
			this.byId('edit').setEnabled(true);
		}.bind(this));

        this.getView().setModel(oModel, "results");
		this.getView().setModel(oModel);
		
		this.getView().bindElement("/results/0");
		this._formFragments = {};
	   },

handleEditPress: function () {
    var oInputControl = this.getView().byId('productInputWithList2');
	var comboBoxControl = this.getView().byId('combobox');

    if (oInputControl && comboBoxControl) {
        oInputControl.setEditable(true);
		comboBoxControl.setEditable(true);
    } else {
        console.error("Control with ID 'productInputWithList' not found.");
    }

    this._toggleButtonsAndView(true);
},

handleCancelPress : function () {
	var oInputControl = this.getView().byId('productInputWithList2');
	var comboBoxControl = this.getView().byId('combobox');

    var oModel = this.getView().getModel();
    var oData = oModel.getData();
	oInputControl.setEditable(false);
	comboBoxControl.setEditable(false);
    oData.results[0] = this._oSupplier;

    oModel.setData(oData);
    this._toggleButtonsAndView(false);
},

handleSavePress : function () {
	var oInputControl = this.getView().byId('productInputWithList2');
	var comboBoxControl = this.getView().byId('combobox');

    if (oInputControl) {
        oInputControl.setEditable(false);
		comboBoxControl.setEditable(false);
    } else {
        console.error("Control with ID 'productInputWithList' not found.");
    }
	this._toggleButtonsAndView(false);

},

_toggleButtonsAndView : function (bEdit) {
	var oView = this.getView();

	// Show the appropriate action buttons
	oView.byId("edit").setVisible(!bEdit);
	oView.byId("save").setVisible(bEdit);
	oView.byId("cancel").setVisible(bEdit);

},

_getFormFragment: function (sFragmentName) {
	var pFormFragment = this._formFragments[sFragmentName],
		oView = this.getView();

	if (!pFormFragment) {
		pFormFragment = Fragment.load({
			id: oView.getId(),
			name: "sap.ui.layout.sample.Form354." + sFragmentName
		});
		this._formFragments[sFragmentName] = pFormFragment;
	}

	return pFormFragment;
},


	   formatDate: function (timestamp) {
		if (!timestamp) {
        return ""; 
		}
		const date = new Date(parseInt(timestamp.substr(6))); 
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear().toString().substr(2);

		return `${day}-${month}-${year}`;
	  },

	   onObjectMatched(oEvent) {
		this.getView().bindElement({
			path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").id),
			model: "results"
		});
	},

	   onNavBack() {
		const oHistory = History.getInstance();
		const sPreviousHash = oHistory.getPreviousHash();

		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("table", {}, true);
		}
	},	
	
	initRichTextEditor: function (bIsTinyMCE5) {
		var that = this;
		var instructionLongPlaceholder = '{INSTRUCTION_LONG_PLACEHOLDER}';
		
		var	sHtmlValue = `<p>${instructionLongPlaceholder}!!!!</p>`;
		sap.ui.require(["sap/ui/richtexteditor/RichTextEditor", "sap/ui/richtexteditor/library"],
			function (RTE, library) {
				var EditorType = library.EditorType;

				that.oRichTextEditor = new RTE("myRTE", {
					editorType: bIsTinyMCE5 ? EditorType.TinyMCE5 : EditorType.TinyMCE6,
					width: "100%",
					height: "400px",
					customToolbar: true,
					showGroupFont: true,
					showGroupLink: true,
					showGroupInsert: true,
					value: sHtmlValue,
					ready: function () {
						var instructionLongValue = that.getView().getModel("results").getProperty("/results/0/InstructionLong");
						sHtmlValue = sHtmlValue.replace(instructionLongPlaceholder, instructionLongValue);
						that.oRichTextEditor.setValue(sHtmlValue);

						// Set the updated HTML content to the RichTextEditor
						bIsTinyMCE5 ? this.addButtonGroup("styleselect").addButtonGroup("table") : this.addButtonGroup("styles").addButtonGroup("table");
					}
				});

				that.getView().byId("idVerticalLayout").addContent(that.oRichTextEditor);
		});
	 }
	 
	});
 });
 