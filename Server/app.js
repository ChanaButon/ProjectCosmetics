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
const accountSid = 'ACad15a0d1f1b604c34f2bded930f83f90';
const authToken = 'f1c43faa29896d0002aebb5f059adc09';
const client = require('twilio')(accountSid, authToken);


app.post('/send-sms', async (req, res) => {
    const { to, body } = req.body;
  
    try {
      const message = await client.messages.create({
        from: '+17814841069', // Your Twilio phone number
        to,
        body,
      });
  
      console.log('SMS sent successfully:', message.sid);
      res.json({ success: true, message: 'SMS sent successfully' });
    } catch (error) {
      console.error('Error sending SMS:', error);
      res.status(500).json({ success: false, message: 'Failed to send SMS' });
    }
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

app.use('/User',userRouter)
app.use('/UserType',userTypeRouter)
app.use('/days', daysRouter)
app.use('/timeDay',timeDaysRouter)
app.use('/treatmant',treatmantRouter)
app.use('/queue',queueRouter)
app.use('/product',productRouter)


app.listen(PORT,()=>{
    console.log(`listening on  ${PORT}`);
})








