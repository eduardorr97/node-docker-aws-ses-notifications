const AWS = require("aws-sdk");
const env_config = {
  apiVersion: process.env.API_VERSION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
  from: process.env.FROM,
  supportEmail: process.env.SUPPORT_EMAIL
}

class EmailSender {
  constructor(config) {
    this.config = config || env_config
  }

  sendEmail(destinations, subject, html, emailfrom) {
    console.log("sendemail: ", destinations, subject, emailfrom);
    return new Promise((resolve, reject) => {
      if (!destinations) {
        reject('with out destinations')
        return
      };

      destinations = !Array.isArray(destinations)
        ? [destinations]
        : destinations;

      let message = {
        Source: emailfrom || this.config.from,
        Destination: {
          ToAddresses: destinations,
        },
        ReplyToAddresses: [this.config.supportEmail],
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: html,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: subject,
          },
        },
      };

      new AWS.SES(this.config)
        .sendEmail(message)
        .promise()
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

module.exports = {
  EmailSender,
};
