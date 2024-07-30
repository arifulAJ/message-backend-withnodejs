const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});

const emailWithNodemailer = async (emailData) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_USERNAME, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.html, // html body
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent %s", info.response);
        return { success: true };
    } catch (error) {
        console.error('Error sending mail', error);
        throw error;
    }
};

const generateOneTimeCode = () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
};

const prepareEmailData = (email, name, oneTimeCode) => {
    return {
        email,
        subject: 'Account Activation Email',
        html: `
            <h1>Hello, ${name}</h1>
            <p>Your One Time Code is <h3>${oneTimeCode}</h3> to reset your password</p>
            <small>This Code is valid for 3 minutes</small>
        `
    };
};

const sendActivationEmail = async (email, name) => {
    const oneTimeCode = generateOneTimeCode();
    console.log(oneTimeCode,"-------------------send email")
    const emailData = prepareEmailData(email, name, oneTimeCode);

    const result = await emailWithNodemailer(emailData);
    // await user.save();

    if (result.success) {
        return { success: true, message: "Thanks! Please check your E-mail to verify.", oneTimeCode };
        // await user.save();

    } else {
        return { success: false, error: result.error };
    }
};

module.exports = sendActivationEmail;
