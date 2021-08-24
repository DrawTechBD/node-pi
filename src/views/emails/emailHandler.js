const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const RESET_PASSWORD = "./template/resetPassword.handlebars";
const REQUEST_RESET_PASSWORD = "./template/requestResetPassword.handlebars";

module.exports = {
    RESET_PASSWORD,
    REQUEST_RESET_PASSWORD,
    sendEmail: async function (email, subject, payload, template) {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
        const options = () => {
            return {
                from: process.env.FROM_EMAIL,
                to: email,
                subject: subject,
                html: compiledTemplate(payload),
            };
        };

        // Send email
        transporter.sendMail(options(), (error, info) => {
            if (error) {
                throw error;
            } else {
                return res.status(200).json({success: true});
            }
        });
    }
};