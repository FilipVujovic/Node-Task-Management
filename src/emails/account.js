const sgMail = require("@sendgrid/mail");


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email, 
    from: "f.vujovic.iis@gmail.com",
    subject: 'Welcome ' + name,
    text: `Welcome to the app, ${name}.`,
  };
  sgMail.send(msg);
};

module.exports = {
    sendWelcomeEmail
}