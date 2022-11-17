const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")

router.get('/', (req, res) => {
    res.send('Chal Gaya!')
})

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
            const user = new User({
                email,
                password,
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

module.exports = router