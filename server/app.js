const bodyParser = require('body-parser');
const express = require('express');
const https =  require('https');

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

const port = process.env.PORT ? process.env.PORT : 3001;
app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`);
);

if (process.env.HTTPS) {
  if (!process.env.BERZEG_CA_SSL_KEY || !process.env.BERZEG_CA_SSL_CERT) {
    throw Error(`Must define paths to ssl key and certificate by assigning .env variables 'BERZEG_CA_SSL_KEY' and 'BERZEG_CA_SSL_CERT'`);
  }

  https.createServer({
    key: fs.readFileSync(process.env.BERZEG_CA_SSL_KEY),
    cert: fs.readFileSync(process.env.BERZEG_CA_SSL_CERT),
  }, app).listen(443);
}
