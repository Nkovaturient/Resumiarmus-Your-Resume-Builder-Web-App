import nodemailer from 'nodemailer'; 
import {config} from '../config/config.js';
import {google} from 'googleapis';

const CLIENT_ID = config.OAUTH_CLIENTID
const CLIENT_SECRET = config.OAUTH_CLIENT_SECRET
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = config.OAUTH_REFRESH_TOKEN
const SENDER_EMAIL = config.MAIL_SENDER;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function createTransporter() {
  try {
    // Get the access token
    // const accessToken = await oAuth2Client.getAccessToken();
    const accessToken =  await new Promise((resolve, reject) => {
          oAuth2Client.getAccessToken((err, token) => {
            if (err) {
              reject("Failed to create access token :(");
            }
            resolve(token);
          }); 
        });

    // Create a transporter using the obtained access token
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    return transporter;
  } catch (error) {
    console.error('Error creating transporter:', error.message);
    throw error;
  }
}

async function sendMail(SENDER_EMAIL, recipient, subject, msg) {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: SENDER_EMAIL,
      to: recipient,
      subject: subject,
      text: 'This is a test email using Nodemailer and OAuth2.',
      html: msg,
    };

 /*event handler on token update notifications */
  transporter.on("token", (token) => {
    console.log("A new access token was generated");
    console.log("User: %s", token.user);
    console.log("Access Token: %s", token.accessToken);
    console.log("Expires: %s", new Date(token.expires));
  });

  const sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
  };

  try {
    sendEmail(mailOptions);
    console.log('Email sent successfully:');
  } catch (error) {
      console.error('Error in transporter:', error);
  }
  //   const result = await transporter.sendMail(mailOptions);
  //   console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
} 

export default sendMail;



// const sendMail=  (sender, recipient, subject, msg) => {

//   const message = {
//     from: sender, // Sender address 
//     to: recipient,    // List of recipients
//     subject: subject, // Subject line
//     html: msg //message
//   }; 

//   const createTransporter = async () => {

//   const OAuth2 = google.auth.OAuth2;

 
//     const oauth2Client = new OAuth2(
//       config.OAUTH_CLIENTID,
//       config.OAUTH_CLIENT_SECRET,
//       "https://developers.google.com/oauthplayground"
//     );
  
//     oauth2Client.setCredentials({
//       refresh_token: config.OAUTH_REFRESH_TOKEN
//     });

//   const accessToken =  await new Promise((resolve, reject) => {
//     oauth2Client.getAccessToken((err, token) => {
//       if (err) {
//         reject("Failed to create access token :(");
//       }
//       resolve(token);
//     }); 
//   });

//   const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: config.MAIL_SENDER,
//         accessToken,
//         clientId: config.OAUTH_CLIENTID,
//         clientSecret: config.OAUTH_CLIENT_SECRET,
//         refreshToken: config.OAUTH_REFRESH_TOKEN
//       },
//       tls: {
//         rejectUnauthorized: false
//       }
//     });

//     return transporter;
//   }

//   /*event handler on token update notifications */
//   transporter.on("token", (token) => {
//     console.log("A new access token was generated");
//     console.log("User: %s", token.user);
//     console.log("Access Token: %s", token.accessToken);
//     console.log("Expires: %s", new Date(token.expires));
//   });

//   const sendEmail = async (emailOptions) => {
//     let emailTransporter = await createTransporter();
//     await emailTransporter.sendMail(emailOptions);
//   };

//   try {
//     sendEmail(message);
//   } catch (error) {
//       console.error('Error creating transporter:', error);
//   }

// }


//export default sendMail;