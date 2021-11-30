const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config()
const app = express();
//Clave privada
const stripe = new Stripe(process.env.REACT_APP_SERVER_KEY);
stripe.setMaxNetworkRetries(2);

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  if (items === 'price_1JzTdjFPRmFD0isHDIeQnaXF') {
    return 4000 * 100;
  }
};

app.post("/buy/checkout/", async (req, res) => {
  try {
    const { id, amount, receipt_email } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(amount),
      currency: "MXN",
      description: "Software serial",
      payment_method: id,
      receipt_email,
      confirm: true
    });
    console.log("Payment: ", payment);
    res.send({ message: 'Successful', status: payment.status });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message, status: err.raw.decline_code });
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: 'kevinleon.morales@gmail.com', // generated ethereal user
        pass: '260195123As', // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'kevinleon.morales@gmail.com', // sender address
      to: "jahaziel.lem@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?Plaintext", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  //main().catch(console.error);



app.listen(3001, () => {
  console.log("Node server listening on port 3001!")
});
