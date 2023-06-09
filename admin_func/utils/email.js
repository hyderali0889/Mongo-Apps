const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main( subject , text ,email ) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
   // secure: true,
    auth: {
      user: "myreactapplications@gmail.com", // generated ethereal user
      pass: "pxstnsxwihdymnte", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Admin Func App" adminfunc@gmail.com', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text:text, // plain text body // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main;
