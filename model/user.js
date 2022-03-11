const dbConnPool = require('./db');

let Users = {};

Users.getUsers = async() => {

    let result = {};

    let dbConn = await dbConnPool.getConnection();
    const rows = await dbConn.query("SELECT userId,username,`first` FROM user");
    dbConn.end();

    if (rows.length > 0) {
        result.status = true;
        result.data = rows;
    } else {
        result.status = false;
    }

    return result;
};


Users.getUser = async(userId) => {

    let result = {};
    if (isNaN(userId)) {
        result.status = false;
    } else {
        let dbConn = await dbConnPool.getConnection();
        const rows = await dbConn.query("SELECT userId,username,`first` FROM user WHERE userId = ?", [userId]);
        dbConn.end();

        if (rows.length > 0) {
            result.status = true;
            result.data = rows[0];
        } else {
            result.status = false;
        }
    }
    return result;
};

module.exports = Users;