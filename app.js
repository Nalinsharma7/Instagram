const express = require('express')
const app = express();
const PORT = 5000;
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')
//G5XuknS5LiWICamV


require('./models/user')
require('./models/post')




mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo')
})
mongoose.connection.on('error',(err)=>{
    console.log('Error in connecting to mongo',err)
})

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

const customMiddleware = (req,res,next)=>{
    console.log("Middleware Fired!!")
    next()
}

// app.use(customMiddleware);

app.get('/',(req,res)=>{
    res.send("HELLO WORLD")
})

app.get('/about',customMiddleware,(req,res)=>{
    console.log("About")
    res.send("About")
})

app.listen(PORT,()=>{
    console.log("RUNNING ON 5000")
})