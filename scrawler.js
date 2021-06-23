const models = require("./db"); // import model
const cheerio = require('cheerio');
const request = require('request-promise');
var crawlerPost = function () {
    request('https://vnexpress.net/tin-tuc-24h', (err, response, html) => {
        if (!err && response.statusCode == 200) {
            let $ = cheerio.load(html); // load HTML
            $('[class="item-news item-news-common"]').each(async (index, el) => {
                const title = $(el).find('.title-news a').text(); // lấy tên title
                console.log(title);
                var link;
                link =$(el).find('.title-news a').attr('href') //lấy link
                await request(link, async (err, response, html) => {
                    if (!err && response.statusCode == 200) {
                        let $ = cheerio.load(html);
                        var post_title = await $('.container')
                            .find('.title-detail')
                            .text()
                            .replace(/\s\s+/g,'') // clear space title on url request
                        var post_content = await $('.container').find('.sidebar-1')
                            .text();
                        let crawPost =await models.post.create({
                            link,
                            post_title ,
                            post_content
                        })
                        console.log(crawPost)
                    } else {
                        console.log(err)
                    }
                })
            })
        } else {
            console.log(err);
        }
    })
}
module.exports = crawlerPost