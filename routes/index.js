const express = require('express');
const router = express.Router();

const menuModel = require('../model/menu');

/* GET home page. */
router.get('/', async function(req, res) {

    let menuItems = await menuModel.getItems();


    menuItems.name = "main";

    //console.log(menuItems);
    res.render('index', { title: 'Express', menu: menuItems });
});

module.exports = router;