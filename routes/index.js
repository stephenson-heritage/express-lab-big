const express = require('express');
const router = express.Router();

const menuModel = require('../model/menu');
const pageModel = require('../model/page');

let loadPage = async function(pageKey, req, res, next, edit = false) {
    if (pageKey != '') {
        let page = await pageModel.getPage(pageKey);
        if (page.status) {
            let menuItems = await menuModel.getItems();
            menuItems.name = "main";
            page.edit = edit;
            page.login = req.login;
            //console.log(page);
            res.render('index', { page: page, menu: menuItems });
            return;
        }
    }
    next();
}

/* GET home page. */
router.get('/', async function(req, res, next) {
    loadPage('home', req, res, next)
});

router.get('/page/:pageKey', async(req, res, next) => {
    let pageKey = req.params.pageKey.trim().toLowerCase();
    loadPage(pageKey, req, res, next);
});

// data sent
router.post('/page/:pageKey', async(req, res, next) => {
    let pageKey = req.params.pageKey.trim().toLowerCase();

    //console.log(req.body);

    if (pageKey != '') {

        if (req.login.status) {
            // require login for post function
            if (req.body.function === "edit") {
                let oldpage = await pageModel.getPage(pageKey);
                if (oldpage.status) {
                    await pageModel.updatePage(pageKey, req.body, req.login.user.userId);
                }
            }
        }
        let menuItems = await menuModel.getItems();
        menuItems.name = "main";
        let page = await pageModel.getPage(pageKey);
        page.login = req.login;
        res.render('index', { page: page, menu: menuItems });
        return;

    }
    //res.send(`cannot update ${pageKey}`);

    next();

});

router.get('/page/:pageKey/edit', async(req, res, next) => {
    let pageKey = req.params.pageKey.trim().toLowerCase();
    loadPage(pageKey, req, res, next, true);
});
module.exports = router;