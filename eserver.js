// const express = require('express')
// const app = express();

const express = require('express')
const mongoose = require('mongoose')

//import the user collection
const User=require('./model/usermodel')

const app = express();
app.use(express.json())


//end connecting the mongodb with express
mongoose.connect('mongodb://localhost:27017/').then(()=>{
    console.log('MONGODB is connected Succesfully')
})

//creating a schema which defines the structure of the document
//username //email //password //passwordConfirm 


//creating api
app.post('/signup',async(req,res)=>{
   console.log(req.body)
   const {username, email, password, passwordconfirm} = req.body
   console.log(username, email, password, passwordconfirm)
   try {
    //finding the user-email  if its is already exists
    const exitingUser = await user.findOne({email})
    if (exitingUser) {
        return res.status(400).json({
            message : "Email already exists"
        })
    }
    const user = await user.create(req.body)
    res.status(201).json({
        message : "user created"
    })
   }catch (error){
    res.status(500).json({
        message:error
    })
   }
})

//api for login the user 
app.post('/login',async(req,res)=>{
    try{
const {email , password} = req.body

//NOTE check if user is registered or not 
const user = await User.findOne({email})
if(!user){
    return res.status(400).json({
        messsage : "User not registered,Please Sign up"
    })
}
    }catch(error){
        res.status(500).json({
            message:error
        })
    }
})

// Rest of your code...
// app.use((err ,req, res , next)=>{
//     res.status(err.status || 500).json({
//         message : err.message || "Internal Server Error"
//     })
// })

// app.use(function(req,res,next)
// {
//     console.log("middleware running")
//     next()
//})
//res.send('hello, world!');

//app.get("/" , (req, res ) =>
//{
    //res.end("this is home page")
//})

//app.get("/profile" , (req, res ) =>
//{``
    //res.end("this is profile page")
//})
//app.get("/about" , (req, res ) =>
//{
    //res.send("this is about page")
//})

app.listen(3000, () => {
    console.log('Server Listening on port 3000');
});