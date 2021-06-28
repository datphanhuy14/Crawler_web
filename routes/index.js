var express = require('express');
var router = express.Router();
const db = require('../db');
var crawler = require('../controllers/scrawler')
const post_controllers = require('../controllers/controllersRouter')

var research = []
/* GET home page. */
// router.get('/', async function (req, res, next) {
//     let getPost = await db.post.findAll({raw: true} )
//     res.render('index', {
//         data: getPost,
//         active_menu: 'blog'
//     });
// });
router.get('/search', post_controllers.search)

router.get('/:page([0-9])', post_controllers.pagi);
router.get('/post/:id([0-9]+)', post_controllers.postId)
router.get('/', post_controllers.pagi);
module.exports = router;
