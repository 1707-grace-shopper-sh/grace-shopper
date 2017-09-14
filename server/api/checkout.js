'use strict'
const api = require('express').Router()
const nodemailer = require('nodemailer')

api.route('/')
    .post(function(req,res){
        console.log (req.body)
        let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // secure:true for port 465, secure:false for port 587
                auth: {
                    user: 'testemail.gracehopperstudent@gmail.com',
                    pass: 'c0d3g3@ss'
                }
            });
            let mailOptions = {
                from: '"Confirmation Email" <testemail.gracehopperstudent@gmail.com>', // sender address
                to: 'testemail.gracehopperstudent@gmail.com', // list of receivers
                subject: 'Confirmation Email', // Subject line
                text: 'Your order is confirmed', // plain text body

            };
            transporter.sendMail(mailOptions, (error, info) => {
                //console.log("HELLO")
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });


    })

module.exports = api;