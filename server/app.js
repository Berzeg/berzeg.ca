const express = require('express');
const bodyParser = require('body-parser');

const emailSend = require('./methods/email_send.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/email_send', (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  emailSend(
      email,
      subject,
      message
    )
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(`Encountered error while attempting to send email:\n${err}`);
      res.sendStatus(500);
    });
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
