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
 
mongoose.connect(process.env.SHIRA_CODE_MONGODB
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // indAndModify: false
).then(() => {
    console.log('connect to mongo');


}).catch(err => { "myErr" + err })



//routes
const userRouter=require('./Routes/userRoute')
const userTypeRouter=require('./Routes/userTypeRoute')
const productRouter=require('./Routes/productRoute')
const daysRouter=require('./Routes/daysRoute')
const timeDaysRouter=require('./Routes/timeDayRoute')
const treatmantRouter=require('./Routes/TreatmantRoute')
const queueRouter=require('./Routes/QueueRoute')

app.use('/User',userRouter)
app.use('/UserType',userTypeRouter)
app.use('/Product', productRouter)
app.use('/days', daysRouter)
app.use('/timeDay',timeDaysRouter)
app.use('/treatmant',treatmantRouter)
app.use('/queue',queueRouter)


app.listen(PORT,()=>{
    console.log(`listening on  ${PORT}`);
})








