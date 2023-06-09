const nodemailer = require("nodemailer");


async function main( options ) {




  let transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "myreactapplications@gmail.com",
      pass: "vfoqprozcrxycxnj",
    },
  });


  let info = await transporter.sendMail({
    from: '"Hayder Ali" <hyderali3226@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.msg,

  });

  console.log("Message sent: %s", info.messageId);

}

module.exports = main;