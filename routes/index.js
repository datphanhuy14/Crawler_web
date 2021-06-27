var express = require('express');
var router = express.Router();
const db = require('../db');
var crawler = require('../controllers/scrawler')
const pagicontroller = require('../controllers/pagination')

var research = []
/* GET home page. */
// router.get('/', async function (req, res, next) {
//     let getPost = await db.post.findAll({raw: true} )
//     res.render('index', {
//         data: getPost,
//         active_menu: 'blog'
//     });
// });
router.post('/search', async (req, res, next) => {
    console.log(req.body.searchKey);
    let search = {
        where: {
            post_title : { [db.Op.iLike]: '%' + req.body.searchKey + '%'},
        },
        raw: true
    }
    research = await db.post.findAll(search);
    res.render('searchs', {data : research})
})
// router.get('/searchs', ((req, res) => {
//     res.render('searchs', {data : research})
// }))
// router.get('/pagi/:page([0-9]+)', pagicontroller.pagi);
router.get('/:page([0-9])', async(req, res, next) => {
    let limitPagi = 10;
    req.params.page = parseInt(req.params.page) ? req.params.page : 1;
    let page = req.params.page
    console.log(page)
    // let count = await pagicontroller.countDb();
    // console.log(count)
    // let offsetPagi = count-((page-1) * 10); //
    // console.log(offsetPagi)
    let resultPagi = await db.post.findAndCountAll({
        offset: (page-1) * limitPagi,
        limit: limitPagi,
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    })
    let countpage = Math.ceil(resultPagi.count/limitPagi)
    res.render('index', {pages : countpage , data : resultPagi.rows, current : page})
});

router.get('/post/:id([0-9]+)', async (req, res, next) => {
    let id = req.params.id || 1;
    let post = await db.post.findByPk(id);
    res.render('post', {
        data: post,
        active_menu: 'detail'
    });
})

module.exports = router;
