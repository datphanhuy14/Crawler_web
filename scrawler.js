const models = require("./db"); // import model
const cheerio = require('cheerio');
const request = require('request-promise');

var crawlerPost = function () {

    return request('https://vnexpress.net/tin-tuc-24h')
        .then((html)=>{

                console.log(444444);
                let $ = cheerio.load(html); // load HTML
                let links = [];
                $('[class="item-news item-news-common"]').each(async (index, el) => {
                    // const title = $(el).find('.title-news a').text(); // lấy tên title
                    // console.log('-----------------------------------------------------------');
                    let post_img = $(el).find('.thumb-art a picture img').attr('src')
                    // post_img = post_img.split(' ').pop();
                    // console.log(post_img);
                    let link = await $(el).find('.title-news a').attr('href'); //lấy link
                    // console.log(typeof link);
                    if(typeof post_img == 'string' && post_img.length > 10 && post_img.match(/http/ ) != null ){
                        // console.log("aaaa",post_img.match(/http/));
                        console.log(post_img);
                        links.push({
                            link: link,
                            img_url : post_img
                        });
                    }
                    // console.log(link);
                    // await request(link,async (err, response, html) => {
                    //     if (!err && response.statusCode == 200) {
                    //         let $ = await cheerio.load(html);
                    //         var post_title = await  $('.container')
                    //             .find('.title-detail')
                    //             .text()
                    //             .replace(/\s\s+/g,'') // clear space title on url request
                    //         var post_content = await  $('.container').find('.sidebar-1')
                    //             .html();
                    //         let crawPost = await models.post.create({
                    //             link,
                    //             post_title ,
                    //             post_content,
                    //             post_img
                    //         })
                    //         // console.log(crawPost);
                    //     } else {
                    //         console.log(err)
                    //     }
                    // })
                })
            console.log('LINKKKK ',links);
            return links;
        })
        .then((obj)=> {
            console.log("objjj",obj);
            let promiseAll = [];
            for ( let _ele of obj) {
            // obj.map((_ele)=>{
                console.log("ele...",_ele);
                promiseAll.push(request(_ele.link));
            }

        // .then((html) => {
        //         let $ =  cheerio.load(html);
        //         var post_title =   $('.container')
        //             .find('.title-detail')
        //             .text()
        //             .replace(/\s\s+/g,'') // clear space title on url request
        //         var post_content =   $('.container').find('.sidebar-1')
        //             .html();
        //         promiseAll.push(models.post.create({
        //             link : _ele.link,
        //             post_title ,
        //             post_content,
        //             post_img : _ele.img_url
        //         }))
        //     })
            // )
            console.log(promiseAll)
            return Promise.all(promiseAll)
                .then((_promises)=>{
                    console.log(_promises)
                    let _promiseAll = [];

                    _promises.map((html)=>{
                        console.log(1111222)
                                let $ =  cheerio.load(html);
                                var post_title =   $('.container')
                                    .find('.title-detail')
                                    .text()
                                    .replace(/\s\s+/g,'') // clear space title on url request
                                var post_content =   $('.container').find('.sidebar-1')
                                    .html();
                                _promiseAll.push(models.post.create({
                                    link : _ele.link,
                                    post_title ,
                                    post_content,
                                    post_img : _ele.img_url
                                }))
                            })
                    console.log(22233)
                    return _promiseAll;
                    });
        })
        .then((_pomiseall)=>{
            console.log("Thanh Cong");
        })
        .catch((err)=>{
            console.log(err.message);
            return false;
        })

    // request('https://vnexpress.net/tin-tuc-24h', (err, response, html) => {
    //     if (!err && response.statusCode == 200) {
    //         let $ = cheerio.load(html); // load HTML
    //         $('[class="item-news item-news-common"]').each(async (index, el) => {
    //             // const title = $(el).find('.title-news a').text(); // lấy tên title
    //             // console.log(title);
    //             let post_img = $(el).find('.thumb-art a picture source').attr('srcset').split(' ').pop();
    //             console.log(post_img);
    //             let link = await $(el).find('.title-news a').attr('href'); //lấy link
    //             // console.log(link);
    //             // await request(link,async (err, response, html) => {
    //             //     if (!err && response.statusCode == 200) {
    //             //         let $ = await cheerio.load(html);
    //             //         var post_title = await  $('.container')
    //             //             .find('.title-detail')
    //             //             .text()
    //             //             .replace(/\s\s+/g,'') // clear space title on url request
    //             //         var post_content = await  $('.container').find('.sidebar-1')
    //             //             .html();
    //             //         let crawPost = await models.post.create({
    //             //             link,
    //             //             post_title ,
    //             //             post_content,
    //             //             post_img
    //             //         })
    //             //         // console.log(crawPost);
    //             //     } else {
    //             //         console.log(err)
    //             //     }
    //             // })
    //         })
    //     } else {
    //         console.log(err);
    //     }
    // })
};
var getPost = async (res,req) => {
    let getValuePost = await models.post.findOne();
    console.log(getValuePost);
}

console.log(22222);
crawlerPost().then(()=>{
    console.log(33333);
});
// module.exports = {crawlerPost,getPost}