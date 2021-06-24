var express = require('express');
var router = express.Router();
const models = require('../db');
var crawler = require('../scrawler')


/* GET home page. */
router.get('/',  async function(req, res, next) {
    // models.sequelize.sync()
    //   .then(crawler.crawlerPost)
    let getPost =await models.post.findAll({raw: true})
    // console.log(getPost[1]);
  res.render('index', { data: getPost });
});

module.exports = router;
