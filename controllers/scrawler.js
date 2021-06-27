const db = require("../db"); // import model
const cheerio = require('cheerio');
const request = require('request-promise');

let crawlerPost = function () {

    return request('https://vnexpress.net/tin-tuc-24h')
        .then((_html) => {
            console.log("LOAD WEBSITE DONE : ");
            let $ = cheerio.load(_html); // load HTML
            let _news = [];
            $('[class="item-news item-news-common"]').each((index, _el) => {
                let image_url = $(_el).find('.thumb-art a picture img').attr('data-src'); //
                let link_url;
                let post_description;
                if (image_url) {
                    // console.log(image_url);
                    post_description = $(_el).find('.description a').text();
                    link_url = $(_el).find('.thumb-art a').attr('href')
                    // console.log(link_url);
                    _news.push({
                        link: link_url,
                        post_img: image_url,
                        post_description: post_description
                    })
                }
            });
            return _news;
        })
        .then((_news) => {
            console.log("GOT ALL NEWS", _news.length);
            let promiseAll = [];
            //add async function to array
            for (let _new of _news) {
                promiseAll.push(getDetail(_new));
            }

            //process all async function in array
            return Promise.all(promiseAll);
        })
        .then((_news) => {
            return _news.length;
            // console.log(JSON.stringify(_news,2,2));
        })
        .catch((err) => {
            console.log(err.message);
            return false;
        })
};

/*

 */

function getDetail(_new) {
    let ops = {
        uri: _new.link,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    return request(ops)
        .then(($) => {
            let post_title;
            post_title = $('.container').find('.title-detail').text().replace(/\s\s+/g, ''); // clear space title on url request
            let post_content = $('.container').find('.sidebar-1').html();
            // console.log("GET TIfindOrCreateTLE : ",post_title);
            return {
                link: _new.link,
                post_title,
                post_content,
                post_img: _new.post_img,
                post_description: _new.post_description
            };
        })
        .then(async (_new) => {
            // console.log(_new.post_img)
            let check = await db.post.findOne({where: {link: _new.link}});
            if (!check)
                db.post.create(_new)
        })
        .catch((err) => {
            console.log("ERROR : ", err.message);
            return err;
        })
}

let search = (searchKey) => {
    return db.post.findAll({where: {post_title: searchKey}});
}
module.exports = {crawlerPost, search}