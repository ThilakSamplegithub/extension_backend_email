const express=require('express')
const nodemailer=require("nodemailer")
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config()

app.get('/',(req,res)=>{
    res.send('welcome')
})
const transporter = nodemailer.createTransport({
    service: "gmail", // You can replace this with another SMTP provider
    auth: {
      user: process.env.RECIPIENT_MAIL,
      pass: process.env.APP_PASSWORD, // Use an App Password for Gmail, not your main password
    },
  });
  app.post('/sendMail',(req,res)=>{
    const {senderMail,subject,text}=req.body
  const mailOptions = {
    from: senderMail,
    to: process.env.RECIPIENT_MAIL,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(400).json({error:error.message})
    } else {
      console.log("Email sent:", info.response);
      return res.status(200).json({success:"Email Sent"})
    }
  });
})
app.listen(process.env.PORT,()=>{
    console.log(`port ${process.env.PORT} is running`)
})