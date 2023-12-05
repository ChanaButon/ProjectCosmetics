const express=require('express')
const app=express()
const PORT=3321
const bodyParser=require('body-parser')
app.use(bodyParser.json())
const jwt=require('jsonwebtoken')
const env=require('dotenv')
env.config()
const cors=require('cors')
app.use(cors())


const secret=process.env.SECRET
const mongoose=require('mongoose')
const nodemailer = require('nodemailer'); // Import nodemailer
const accountSid = 'ACad15a0d1f1b604c34f2bded930f83f90';
const authToken = 'f1c43faa29896d0002aebb5f059adc09';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'roihodaya@gmail.com', // Your Gmail email address
    pass: 'ytte sjed evdj kmqy', // Your Gmail email password
  },
});

app.post('/send-mail', async (req, res) => {
  const { to, body } = req.body;
  console.log('Received request to send email:', { to, body }); // Log the received request

  // Send email using nodemailer
  const mailOptions = {
    from: 'roihodaya@gmail.com', // Your Gmail email address
    to: to, // Recipient's email address
    subject: 'עידכון שעה זמינה',
    text: ` ${body}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send email' });
    } else {
      console.log('Email sent successfully:', info.response);
      res.json({ success: true, message: 'Email sent successfully' });
    }
  });
});


mongoose.connect(process.env.SHIRA_CODE_MONGODB
).then(() => {
    console.log('connect to mongo');


}).catch(err => { "myErr" + err })



//routes
const userRouter=require('./Routes/userRoute')
const userTypeRouter=require('./Routes/userTypeRoute')
const daysRouter=require('./Routes/daysRoute')
const timeDaysRouter=require('./Routes/timeDayRoute')
const treatmantRouter=require('./Routes/TreatmantRoute')
const queueRouter=require('./Routes/QueueRoute')
const productRouter=require('./Routes/productRoute')
const waitListRoute=require('./Routes/waitListRoute')

app.use('/User',userRouter)
app.use('/UserType',userTypeRouter)
app.use('/days', daysRouter)
app.use('/timeDay',timeDaysRouter)
app.use('/treatmant',treatmantRouter)
app.use('/queue',queueRouter)
app.use('/product',productRouter)
app.use('/waitList',waitListRoute)


app.listen(PORT,()=>{
    console.log(`listening on  ${PORT}`);
})








