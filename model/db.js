const mariadb = require('mariadb');
const config = require('../config');

let dbcPool = {
    "pool": null
};

dbcPool.getConnection = async function() {
    if (this.pool === null) {
        this.pool = mariadb.createPool(config.db);
    }

    return await this.pool.getConnection();
};

module.exports = dbcPool;