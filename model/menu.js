const dbConnPool = require('./db');

let Menu = {};

Menu.getItems = async(name = 'main') => {

    let result = {};

    let dbConn = await dbConnPool.getConnection();
    const rows = await dbConn.query("SELECT label,`type`,pageKey,externalURL FROM menu WHERE menuName = ? ORDER BY `order`", [name]);
    dbConn.end();

    if (rows.length > 0) {
        result.status = true;
        result.data = rows;
    } else {
        result.status = false;
    }

    return result;
};



module.exports = Menu;