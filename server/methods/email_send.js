const {URLSearchParams} = require('url');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const MailComposer = require("nodemailer/lib/mail-composer");
const Redis = require('ioredis');

module.exports = function(
  email,
  subject,
  message
) {
  email = email ? email : '';
  subject = subject ? subject : '';
  message = message ? message : '';

  const modifiedMessage = `Message from berzeg.ca email form\n#From: ${email}\n#Subject: ${subject}\n\n${message}`;

  const rawMailPromise = getRawMail({
    from: `Automated Mail Form <${email}>`,
    to: 'hashem@berzeg.ca',
    subject,
    message: modifiedMessage,
  });

  return Promise.all([
      getToken(),
      rawMailPromise,
    ])
    .then(([token, rawMail]) => {
      console.log(`token: ${token}; rawMail: ${rawMail}`);
      return sendMail(token, rawMail)
    });
}

function getToken() {
  const redis = new Redis(3002);
  return redis.pipeline()
    .get('google_api_token')
    .get('google_api_token_expires_at')
    .exec()
    .then(results => {
      const token = results[0][1];
      const tokenExpiresAt = Number(results[1][1]);

      if (
        !token ||
        tokenExpiresAt < Date.now()
      ) {
        return fetchGoogleAPIAccessToken()
          .then(({access_token, expires_in}) => {
            const expiresAt = Date.now() + expires_in * 1000;
            return redis.pipeline()
              .set('google_api_token', access_token)
              .set('google_api_token_expires_at', expiresAt)
              .exec()
              .then(() => access_token);
          })
      } else {
        console.log(`found token from redis: '${results[0]}'; expires at: '${results[1]}'`);
        return Promise.resolve(token);
      }
    })
}

function fetchGoogleAPIAccessToken() {
  const cert = process.env && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const clientEmail = process.env && process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL;
  if (!cert || !clientEmail) {
    throw Error(`Expected 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY' and 'GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL' to be defined in .env`);
  }

  const claimSet = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/gmail.send',
    aud: 'https://www.googleapis.com/oauth2/v4/token',
    exp: Math.floor(Date.now() / 1000) + 60,
    iat: Math.floor(Date.now() / 1000)
  };
  const token = jwt.sign(claimSet, cert, {algorithm: 'RS256'});

  const params = new URLSearchParams();
  params.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
  params.append('assertion', token);

  return fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'POST',
      body: params
    })
    .then(res => res.json())
    .then(json => {
      console.log(`token json: ${JSON.stringify(json)}`);
      return json;
    });
}

function sendMail(token, rawMail) {
  fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Content-length': rawMail.length,
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({raw: rawMail}),
    })
    .then(res => {
      console.log(`res status: ${res.status}`);
      return res.json();
    })
    .then(json => {
      console.log(`res json: ${JSON.stringify(json)}`);
    });
}

function getRawMail({
  from,
  to,
  subject,
  message,
}) {
  const mail = new MailComposer({
    from,
    to,
    subject,
    text: message,
  });
  const mailStream = mail.compile().createReadStream();
  let mailString = '';

  return new Promise(resolve => {
    mailStream.on('data', chunk => mailString += chunk);
    mailStream.on('end', () => {
      const mailBase64 = Buffer.from(mailString).toString('base64');
      const urlSafeBase64 = mailBase64.replace('+', '-').replace('/', '_').replace(/=+$/, '')
      resolve(urlSafeBase64);
    });
  });
}
