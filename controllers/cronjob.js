var cron = require('node-cron');
var crawler = require('../controllers/scrawler')

let runCron = function () {
    console.log("RUN CRON JOB every 5 minutes")
    cron.schedule('*/5 * * * *', () => {
        console.log("chay cron");
        crawler.crawlerPost()
    });
}
module.exports = runCron;