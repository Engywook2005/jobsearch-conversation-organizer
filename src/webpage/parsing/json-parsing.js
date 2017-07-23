/**
 * Created by Greg on 7/22/2017.
 */

class JSONParsing {
    constructor(windowDoc) {
        this._windowDoc = windowDoc;
    }

    //TODO functions for each of the table fields that have an action e.g. click a name and show the person - may need to include contact id's etc in the JSON after all

    writeTableFromData(inputJSON) {
        if(inputJSON.length === 0) {
            //TODO handle scenario where there is no row - empty result
        }
        const outputTable = this._windowDoc.createElement('table');
        outputTable.setAttribute('border', '1');
        outputTable.setAttribute('id', 'convosTable');
        const firstTableRow = this._windowDoc.createElement('tr');
        firstTableRow.setAttribute('class', 'tableHeader');
        outputTable.appendChild(firstTableRow);
        const firstRow = inputJSON[0];
        let prop;
        let i;
        for(prop in firstRow) {
            const headerCell = this._windowDoc.createElement('td');
            firstTableRow.appendChild(headerCell);
            const headerText = this._windowDoc.createTextNode(prop);
            headerCell.appendChild(headerText);
            //TODO - add sorting function
            //TODO - status - be able to toggle kiss off letter filter
        }
        for(i = 0; i < inputJSON.length; i++) {
            const currentDataRow = inputJSON[i];
            const currentTableRow = this._windowDoc.createElement('tr');
            outputTable.appendChild(currentTableRow);
            for(prop in currentDataRow) {
                //TODO try using same function for establishing firstRow and other rows
                const newCell = this._windowDoc.createElement('td');
                currentTableRow.appendChild(newCell);
                if(currentDataRow[prop] !== null) {
                    //TODO fix the time zone crap from the mysql end
                    const newCellText = this._windowDoc.createTextNode(currentDataRow[prop].replace("T04:00:00.000Z",""));
                    newCell.appendChild(newCellText);
                }
                //TODO add click handlers for individual cells - should check on whether function for handling this prop exists in this class (or probably better a click handling class)
            }
        }
        return outputTable;
    }
}

module.exports = JSONParsing;