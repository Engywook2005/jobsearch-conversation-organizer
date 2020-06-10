class QueryBuilder {


    // @TODO this could be a lot better, with insertQuery and updateQuery being the same function.
    static createInsertQuery(table, dataObject) {

        let fieldString = '',
            valuesString = '';

        const doFields = Object.keys(dataObject);

        for (let i = 0; i < doFields.length; i++) {
            const nextComma = (i < doFields.length - 1) ? ',' : '';

            // @TODO make sure field values are safe for SQL before inserting them into table.
            fieldString += `${doFields[i]}${nextComma}`;
            valuesString += `'${dataObject[doFields[i]]}'${nextComma}`;
        }

        // @TODO file path should be a constant
        // @TODO use POST, not GET
        return `http://localhost:8081/insertSQL.json?table=${table}&props=${fieldString}&values=${encodeURIComponent(valuesString)}`;
    }

    static createUpdateQuery(table, dataObject, where) {

        // @TODO use POST, not GET
        return `http://localhost:8081/updateSQL.json?table=${table}&updatedata=${encodeURIComponent(JSON.stringify(dataObject))}&where=${encodeURIComponent(JSON.stringify(where))}`;
    }

}

module.exports = QueryBuilder;