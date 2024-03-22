const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
// const { validationResult } = require('express-validator');

exports.signup = (req, res) => {

    // const errors = validationResult(req);
    // return res.status(400).json({ errors: errors.array() })

    User.findOne({email: req.body.email})
    .then(async (user)=>{
        if(user) return res.status(400).json({
            message: 'User already registered'
        });

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const hash_password = await bcrypt.hash(password, 10)

        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            username: shortid.generate()
        });

        _user.save().then(data => {
            data === _user; // true
            if(data){
                return res.status(201).json({
                    message: 'User created Successfully..!'
                    // user: data
                });
            }
            // else return res.status(400).json({
            //     message: 'zum ting wong'
            // });
        }).catch((err)=>{
            console.log(err);
        });
    })
    .catch((err)=>{
        console.log(err);
    });

    // User.findOne({email: req.body.email})
    // .exec((err, user) => {
    //     if(user) return res.status(400).json({
    //         message: 'User already registered'
    //     });

        // const {
        //     firstName,
        //     lastName,
        //     email,
        //     password
        // } = req.body;

        // const _user = new User({
        //     firstName,
        //     lastName,
        //     email,
        //     password,
        //     username: Math.random().toString()
        // });

        // _user.save((err, data) => {
        //     if(err){
        //         return res.status(400).json({
        //             message: 'zum ting wong'
        //         });
        //     }
        //     if(data){
        //         return res.status(201).json({
        //             user: data
        //         });
        //     }
        // });
    // });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
    .then((user)=>{
    // .exec((error, user) => {
        // if(error) return res.status(400).json({ error });
        if(user){

            if(user.authenticate(req.body.password)){
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const { _id, firstName, lastName, email, role, fullName} = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullName
                    }
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid Password'
                })
            }

        }else{
            return res.status(400).json({message: 'Something went wrong'});
        }
    });
}

