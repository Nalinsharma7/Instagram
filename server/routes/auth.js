const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
// const {SENDGRID_API,EMAIL} = require('../config/keys')
//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

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

router.get('/protected',requireLogin,(req,res)=>{
    res.send("Hello")
})

router.post('/signup', (req, res) => {
    const { name, email, password, pic } = req.body
    if (!name || !email || !password) {
        return res.status(422).json({error:"Please fill all the fields"}) //Status 422 means the code is working fine but the error comes because inputs given are wrong 
    }

    //res.json({message:"Successfully Posted"})

    User.findOne({ email: email })
        .then((SavedUser) => {
            if (SavedUser) {
                return res.status(422).json({error:"Email already Exists in DataBase"})
            }

            bcrypt.hash(password,12)
              .then(hashedpassword=>{
                const user = new User({
                    email,
                    password:hashedpassword,
                    name,
                    pic
                })
    
                user.save()
                    .then(user => {
                        // transporter.sendMail({
                        //     to:user.email,
                        //     from:"nalinsharma606@gmail.com",
                        //     subject:"signup Successfully",
                        //     html:"<h1>Welome Bhaiyya Ji!!</h1>"
                        // })
                        res.json({message:"Saved Changes"})
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
        })
            
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"Please add email or password"})
    }

    User.findOne({email:email})
      .then(SavedUser=>{
        if(!SavedUser){
            return res.status(422).json({error:"Invalid Email || password"})
        }
        bcrypt.compare(password,SavedUser.password)
         .then(doMatch=>{
            if(doMatch){
                // res.json({message:"Successfully signed In"})
                const token = jwt.sign({_id:SavedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic} = SavedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
             }
             else{
                return res.status(422).json({error:"Invalid Email || password"})
             }
         })
          .catch(err=>{
            console.log(err)
          })
      })
})

router.post('/reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err ){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"USER DOESN'T EXIST FOR THAT EMAIL"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"nalinsharma606@gmail.com",
                    subject:"Password reset",
                    html:`
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                     `
                })
                res.json({message:"check your email!!"})
            })
        })
    })
})

router.post('/new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router