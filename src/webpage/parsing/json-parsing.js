/**
 * Created by Greg on 7/22/2017.
 */

class JSONParsing {
    constructor(windowDoc) {
        this._windowDoc = windowDoc;
    }

    //TODO functions for each of the table fields that have an action e.g. click a name and show the person - may need to include contact id's etc in the JSON after all

    writeTableFromData(inputJSON) {
        const outputTable = this._windowDoc.createElement('table');

        return outputTable;
    }
}

module.exports = JSONParsing;