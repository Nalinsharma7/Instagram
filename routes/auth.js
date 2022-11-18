const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')



router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
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
                    name
                })
    
                user.save()
                    .then(user => {
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
                res.json({message:"Successfully signed In"})
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

module.exports = router