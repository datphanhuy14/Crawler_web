const db = require('../db');


let search = async (req, res, next) => {
    console.log(req.query.searchKey);
    let search = {
        where: {
            post_title: {[db.Op.iLike]: '%' + req.query.searchKey + '%'},
        },
        raw: true
    }
    research = await db.post.findAll(search);
    res.render('searchs', {data: research})
}
let pagi = async (req, res, next) => {
    let limitPagi = 10;
    // req.params.page = parseInt(req.params.page) ? req.params.page : 1;
    let page = req.params.page || 1;
    console.log(page)
    let resultPagi = await db.post.findAndCountAll({
        offset: (page - 1) * limitPagi,
        limit: limitPagi,
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    })
    let countpage = Math.ceil(resultPagi.count / limitPagi)
    res.render('index', {pages: countpage, data: resultPagi.rows, current: page})
}
// countDb :
let countDb = async () => {
    let a = await db.post.count()
    return a;
}
let postId = async (req, res, next) => {
    let id = req.params.id || 1;
    let post = await db.post.findByPk(id);
    res.render('post', {
        data: post,
        active_menu: 'detail'
    });
}
module.exports = {
    pagi,
    countDb,
    postId,
    search
}
