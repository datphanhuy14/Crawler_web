var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let nunjucks = require("nunjucks");
var crawler = require('./controllers/scrawler')
const db = require('./db');
const cronjob = require('./controllers/cronjob');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set("view engine", "html");
nunjucks.configure("views", {
    autoescape: true,
    express: app,
});
//Test
//
db.sequelize.sync().then(() => {
    console.log("đã kết nôi");
    crawler.crawlerPost()
        .then(() => {
        cronjob();  // RUN cronjob  after get data onetime for db not null if when start db not yet get data.
    })
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, oxxnly providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {err: err.message});
});

module.exports = app;
