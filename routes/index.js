var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  var post = db.post.findAll()
  console.log(post);
  res.render('index', { title: 'Express' });
});

module.exports = router;
