const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/user.model');
saltRounds=10

router.post('/register', async (req, res) => {
    const { name,email, password,} = req.body
    const originalPassword = req.body.password;
    try {
        bcrypt.hash(originalPassword, saltRounds, async function (err, hash) {
            if (err) {
                res.send("error occured while hashing...")
            } else {
                const user1 = { ...req.body, password: hash }
                const userData = await UserModel.create(user1);
                res.status(201).json({ message: 'User registered successfully',data: userData});
               
            }
        });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})

router.post("/login", async (req, res) => {

    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).json({ "msg": "User not found,please register"})
        } else {

            let OriginalPassword=req.body.password;
            let hashedPassword=user.password;
            bcrypt.compare(OriginalPassword, hashedPassword, async function(err, result) {
                if(err){
                    res.status(404).json({ "msg": "wrong password,please enter correct password!" })
                }else{
                    var token = jwt.sign({ userId:user._id,role:user.role }, process.env.SECRET_KEY,{ expiresIn: "20min"});
                    res.status(200).json({ "msg": "You have LogedIn Successfully...",token})
                }
            })   
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "msg": "login route failed...", error })
    }
})




module.exports = router;
