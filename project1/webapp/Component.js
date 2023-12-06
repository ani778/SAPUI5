sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/util/MockServer",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/BindingMode"
], (UIComponent,JSONModel,MockServer, ODataModel, BindingMode) => {
        "use strict";

        return UIComponent.extend("project1.Component", {
            metadata : {
                manifest: "json",
               
             },


             init() {
                UIComponent.prototype.init.apply(this, arguments);
                console.log('Component Initialized');
             
                const oData = {
                    recipient: {
                        name: "World"
                    }
                };
                const oModel = new JSONModel(oData);
                this.setModel(oModel);
             
                this.getRouter().initialize();

               //-------------------- 

                // var sMockdataUrl = sap.ui.require.toUrl("mockserver");
                // //initialize a mockserver
                // this.oMockServer = new MockServer({
                //     rootUri: "project1.Overview.Main/"
                // });
                // this.oMockServer.simulate(sMockdataUrl + "/metadata.xml", {
                //     sMockdataBaseUrl: sMockdataUrl,
                //     aEntitySetsNames: [
                //         "Products"
                //     ]
                // });
    
                // this.oMockServer.start();
    
                // //define the model for the data, using the mockserver
                // this.oModel = new ODataModel("project1.Overview.Main");
    
                // //default Binding Mode set to TwoWay as condition to use TextInEditModeSource
                // this.oModel.setDefaultBindingMode(BindingMode.TwoWay);
                // this.setModel(this.oModel);
    
                // // call the init function of the parent
                // UIComponent.prototype.init.apply(this, arguments);
            }, 
           
        });
    }
);