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

app.use('/User',userRouter)
app.use('/UserType',userTypeRouter)
app.use('/Product', productRouter)



app.listen(PORT,()=>{
    console.log(`listening on  ${PORT}`);
})








