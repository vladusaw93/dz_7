const nodeCron = require(`node-cron`)
const mailSender = require(`./mailForUsers.cron`);

module.exports = () =>{
    nodeCron.schedule (`12 11 * * *`, async () => {
        mailSender();
})
}
