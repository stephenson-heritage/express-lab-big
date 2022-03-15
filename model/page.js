const dbConnPool = require('./db');

let Page = {};

Page.getPage = async(key) => {

    let result = {};

    let dbConn = await dbConnPool.getConnection();
    const rows = await dbConn.query("SELECT pageKey,title,content,dateModified,username,email FROM `page` JOIN user ON `page`.lastEditUser = user.userId  WHERE pageKey = ?", [key]);
    dbConn.end();

    if (rows.length > 0) {
        result.status = true;
        result.data = rows[0];
    } else {
        result.status = false;
    }

    return result;
};

Page.updatePage = async(key, pageData, userid) => {

    let result = {};

    let dbConn = await dbConnPool.getConnection();
    await dbConn.query("UPDATE `page` SET `title`=?,content=?,lastEditUser=? WHERE `pageKey`=?;", [pageData.title, pageData.content, userid, key]);
    dbConn.end();

    return { status: true };
};



module.exports = Page;