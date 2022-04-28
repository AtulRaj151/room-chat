const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
})

const setMailOptions = (sender, mailLists, subject) => {
    return {
         from: sender,
         to: mailLists,
         subject: subject,
         text: `<h1>Hello, this is sample email from chat</h1>`
    }
}

const sendMail = (mailOptions)=> {
    transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId)
    })
}
module.exports = { setMailOptions, sendMail };



