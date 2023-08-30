const express=require('express')
const app=express()
const bodyParser=require('body-parser')
app.use(bodyParser.json())
const jwt=require('jsonwebtoken')
const env=require('dotenv')
env.config()



const PORT=process.env.PORT
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


const userRouter=require('./Routes/userRoute')
const userTypeRouter=require('./Routes/userTypeRoute')
const productRouter=require('./Routes/productRoute')

app.use('/User',userRouter)
app.use('/UserType',userTypeRouter)
app.use('/Product', productRouter)




// let MyUser;
// app.get('/login',(req,res)=>{  
//     let user=req.body.user
//     MyUser=user
//     let token=jwt.sign(user,secret)
//     MyUser.token=token
//     res.send(MyUser)
// })


// const bearerHeader=req.headers['authorization'];

app.listen(PORT,()=>{
    console.log(`listening on  ${PORT}`);
})
// app.post('/second',(req,res)=>{
//     let token=req.headers['authorization']
//     let bearer=token.split(' ');
//     const bearerToken=bearer[1];
//     console.log(token)
//     if(bearerToken){
//        jwt.verify(bearerToken,secret,(err,data)=>{
//              if(err){
//                 res.send(err)
//         }
//         else{
//             res.send(data)
//         }
//         })
       
//     }
// })