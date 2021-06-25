var express = require('express');
var router = express.Router();
const db = require('../db');
// var crawler = require('../scrawler')


/* GET home page. */
router.get('/', async function (req, res, next) {
    let getPost = await db.post.findAll({raw: true})
    res.render('index', {
        data: getPost,
        active_menu: 'blog'
    });
});
router.post('/search', (req,res, next) => {
        console.log(req.body.searchKey);
})
router.get('/post/:id([0-9]+)', async (req, res, next) => {
    let id = req.params.id;
    let post = await db.post.findByPk(id);
    res.render('post', {
        data: post,
        active_menu : 'detail'
    });
})

module.exports = router;
