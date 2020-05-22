class QueryBuilder {

    static createInsertQuery(table, dataObject) {

        let fieldString = '',
            valuesString = '';

        const doFields = Object.keys(dataObject);

        for(let i = 0; i < doFields.length; i++) {
            const nextComma = (i < doFields.length - 1) ? ',':'';

            // @TODO make sure field values are safe for SQL before inserting them into table.
            fieldString += `${doFields[i]}${nextComma}`;
            valuesString += `'${dataObject[doFields[i]]}'${nextComma}`;
        }

        // @TODO file path should be a constant
        return `http://localhost:8081/updateSQL.json?table=${table}&props=${fieldString}&values=${encodeURIComponent(valuesString)}&updateQuery=false`;
    }
}

module.exports = QueryBuilder;