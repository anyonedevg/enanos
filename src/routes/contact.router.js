const router = require('express').Router();
const nodemailer = require('nodemailer');

router.get('/contact', (req, res) => {
  res.render('contact/contact');
});

router.post('/contact/opinion', async (req, res) => {
  const { name, message } = req.body;
  const { username, email } = req.user;


  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Username: ${username}</li>
    <li>Email: ${email}</li>
    </ul>
    <h3>Message</h3>
    <p>${message}</p>
  `;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anyone.dev.g@gmail.com',
      pass: 'anyone.g.dev'
    }
  })

  let mailOptions = {
    from: `${name} <anyone.dev.g@gmail.com>`, // sender address
    to: "anyone_dev@yahoo.com",//"anyone_dev@yahoo.com", // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  }

  try {
    let info = await transporter.sendMail(mailOptions)

    console.log("INFO", info);
  } catch (e) {
    console.log(e);
  }

  res.redirect('/contact');
});
module.exports = router;