// Importing alll required external modules 

const express=require('express')
const mongoose= require('mongoose')
require('dotenv').config()
const bcrypt= require('bcryptjs')
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');

const User=require('./models/User')
const app=express()
const PORT=3000
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3001', // Your frontend origin
    credentials: true // If you're using cookies/sessions
  }));

//connecting to DB Atlas 
mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log('DB connected sucessfully...')
).catch(
    (err)=>console.log(err)
)

//API landing page
app.get('/',async(request,res)=>{
       try{
          res.send("Welcome to my project")
       }
       catch(err){
        console.log(err)
       }
})
//routes
app.use('/api/recipes', recipeRoutes);



//API registration page http://localhost:3000/register
app.post('/register',async(request,res)=>{
    //collecting user info 
    const {username,email,password}=request.body
    try{
       const hashPassword= await bcrypt.hash(password,10)
       const newUser= new User({username,email,password:hashPassword})
       await newUser.save()
       console.log("new user is created...")
       res.json({message: "user registered"})
    }
    catch(err){
     console.log(err)
    }
})

//API login page http://localhost:3000/login
app.post('/login',async(request,res)=>{
    //collecting user info 
    const {email,password}=request.body
    try{
       const user= await User.findOne({email});

       if(!user || !(await bcrypt.compare(password,user.password)))
         {
        return res.status(400).json({message: "invalid credentials"});
         }
         res.json({message:"Login Successfull...", username: user.username})
        }
    catch(err){
     console.log(err)
    }
})

//server connection and testing
app.listen(PORT, (err)=>{
    if(err){
        console.log(err)
    }
     console.log("Server is running on port "+ PORT)
})

app.use('/uploads', express.static('uploads')); // serve images
app.use(express.json());                        // for parsing application/json
app.use(express.urlencoded({ extended: true })); 

const JWT_SECRET = process.env.JWT_SECRET;
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
