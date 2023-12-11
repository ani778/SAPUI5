// Create a service named "TableService.js"
sap.ui.define([], function () {
    "use strict";

    let _oTable;

    return {
        setTable: function (oTable) {
            _oTable = oTable;
        },
        getTable: function () {
            return _oTable;
        }
    };
});
