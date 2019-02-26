const nodemailer = require('nodemailer');

async function send(name, message) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anyone.dev.g@gmail.com',
      pass: 'anyone.g.dev'
    }
  });

  const mailOptions = {
    from: `${name} <anyone.dev.g@gmail.com>`,
    to: "anyone_dev@yahoo.com",
    subject: "Enanos",
    html: message
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }

}

module.exports = { send };