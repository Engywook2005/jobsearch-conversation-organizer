class InjectConstructor {

    static constructInjexQuery(table, fields, values) {
        const returnQuery = `INSERT INTO ${table} (${fields}) VALUES (${values})`;

        return returnQuery;
    }

    static constructUpdateQuery(table, updateFields, where) {
        const fieldsParsed = JSON.parse(updateFields),
            fieldKeys = Object.keys(fieldsParsed),
            whereParsed = JSON.parse(where),
            whereParsedKeys = Object.keys(whereParsed);

        let returnQuery = `UPDATE ${table} SET `,
            i;

        for(i = 0; i < fieldKeys.length; i++) {
            const key = fieldKeys[i],
                nextComma = i < fieldKeys.length - 1 ?
                    ', ' :
                    ' ',
                updateValue = typeof fieldsParsed[key] === 'string' ?
                    `"${fieldsParsed[key]}"` :
                    fieldsParsed[key];

            //console.log(`${fieldsParsed[key]} ${typeof fieldsParsed[key] }`);

            returnQuery += `${key} = ${updateValue}${nextComma}`;
        }

        returnQuery += 'WHERE ';

        for(i = 0; i < whereParsedKeys.length; i++) {
            const key = whereParsedKeys[i],
                nextAnd = i < whereParsedKeys.length - 1 ?
                    ' AND ' :
                    '';

            returnQuery += `${key} = ${whereParsed[key]}${nextAnd}`;
        }

        return returnQuery;
    }

    static constructSelexQuery(table, where = null) {
        let query = `SELECT DISTINCT * FROM ${table}${InjectConstructor.whereQuery(where)};`;

        console.log(query);

        return query;
    }

    static whereQuery(where) {
        if(!where) {
            return '';
        }

        const whereObj = JSON.parse(where),
            whereKeys = Object.keys(whereObj);

        if(Object.keys(whereObj).length === 0) {
            return '';
        }

        let wherePart = ' WHERE ';

        for(let i = 0; i < whereKeys.length; i++) {
            const key = whereKeys[i],
                val = whereObj[key],
                nextAnd = i < whereKeys.length - 1 ?
                    ' AND ' :
                    '';

            wherePart += `${key} = ${val}${nextAnd}`;
        }

        return wherePart;
    }
}

module.exports = InjectConstructor;