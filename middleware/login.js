const userModel = require('../model/user');

const Login = async(req, res, next) => {

    var login = { status: false };


    if (req.query.logout !== undefined) {
        res.clearCookie("username");
        res.clearCookie("h");
    } else {
        if (req.body.function === "login" && req.body.username !== undefined && req.body.password !== undefined) {
            const username = req.body.username.toLowerCase();
            login = await userModel.authWithPassword(username, req.body.password);
            //console.log(login);
            if (login.status) {
                const maxAge = 1000 * 60 * 60 * 24 * 2;
                res.cookie("username", username, { maxAge: maxAge });
                res.cookie("h", login.user.cookieHash, { maxAge: maxAge });
            }
        } else if (req.cookies.username !== undefined && req.cookies.h !== undefined) {

            login = await userModel.authWithCookies(req.cookies.username, req.cookies.h);
            //console.log(login);
            if (!login.status) {
                res.clearCookie("username");
                res.clearCookie("h");
            }
        }
    }


    req.login = login;

    next();

};


module.exports = Login;