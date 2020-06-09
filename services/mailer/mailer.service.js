const nodemailer = require("nodemailer");
const EmailTemplates = require(`email-templates`);
const path = require(`path`);

const {MAIL_SERVICE, MY_EMAIL, MY_PASSWORD} = require(`../../config`)
const htmlTemlates = require("../../mailTemplates");


const transporter = nodemailer.createTransport({
    service: MAIL_SERVICE,
    auth: {
        user: MY_EMAIL,
        pass: MY_PASSWORD,
    }
})

const emailTemplate = new EmailTemplates({
    message: null,
    views: {root: path.resolve(process.cwd(), `mailTemplates/`)}

})

class MailService {
    async sendMails(userEmail, action,context) {

        const templateInfo = htmlTemlates[action];

        const html = await emailTemplate.render(templateInfo.templateFileName, context);

        const ParamsToMailer = {
            from: `your best shop`,
            to: userEmail,
            subject: templateInfo.subject,
            html
        }

        // console.log(MY_EMAIL, MY_PASSWORD, MAIL_SERVICE);
        return transporter.sendMail(ParamsToMailer);
    }
}

module.exports = new MailService();
