const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "dineshkarthikrajand.22cse@kongu.edu", // your email
    pass: "akzstekvatwhziov", // your app password or email password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * Send an email with given subject and text content
 * @param {string} subject - Email subject
 * @param {string} text - Email body text
 */
async function sendEmail(subject, text) {
  try {
    await transporter.sendMail({
      from: '"Srinivas Fireworks" <dineshkarthikrajand.22cse@kongu.edu>',
      to: "dineshkumars.22cse@kongu.edu", // recipient email, you can customize
      subject,
      text,
    });
    console.log(`Email sent: ${subject}`);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}

module.exports = sendEmail;
