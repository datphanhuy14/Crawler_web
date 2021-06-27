const db = require('../db');

   let pagi = async(req, res, next) => {
        let limitPagi = 1;
        let page = req.query.page;
        console
        let count = await countDb()-10;
        console.log(count)
        let offsetPagi = count-((page-1) * 10); //
        console.log(offsetPagi)
        let resultPagi = await db.post.findAndCountAll({
            offset: offsetPagi,
            limit: limitPagi,
            raw: true,
            // order: [
            //     ['id', 'DESC']
            // ]
        })
        // console.log(resultPagi)
    }
// countDb :
let countDb = async () => {
    let a = await db.post.count()
    return a;
}
module.exports = {
       pagi,countDb
}
