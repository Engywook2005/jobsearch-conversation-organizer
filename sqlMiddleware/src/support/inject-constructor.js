class InjectConstructor {

    static constructInjexQuery(table, fields, values) {
        const returnQuery = `INSERT INTO ${table} (${fields}) VALUES (${values})`;

        return returnQuery;
    }

}

module.exports = InjectConstructor;