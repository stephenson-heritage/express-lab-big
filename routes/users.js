const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const menuModel = require('../model/menu');


/* GET users listing. */
router.get('/create', async(req, res) => {
    let menuItems = await menuModel.getItems();
    let page = { data: { title: "Create Account" } };
    res.render('create_account', { menu: menuItems, page: page });
});


router.post('/create', async(req, res) => {
    let menuItems = await menuModel.getItems();
    let page = { data: { title: "Account Created" } };

    let result = {
        status: false,
        user: null,
        message: "unable to create account"
    }
    if (req.body.function === "create") {
        console.log("creating account");
        result = await userModel.addUser(req.body);
    }

    res.render('account_created', { menu: menuItems, page: page, result: result });
});




module.exports = router;