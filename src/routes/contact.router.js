const router = require('express').Router();
const { send } = require('../config/mail');

router.get('/contact', (req, res) => {
  res.render('contact/contact');
});

router.post('/contact/message', async (req, res) => {
  const { name, message } = req.body;
  const { _id, username, email } = req.user;

  const html = `
    <h3>Detalles del usuario:</h3>
    <ul>
    <li>ID: ${_id}</li>
    <li>Username: ${username}</li>
    <li>Email: ${email}</li>
    </ul>
    <h3>Mensaje:</h3>
    <p>${message}</p>
  `;

  send(name, html);

  res.redirect('/contact');
});
module.exports = router;