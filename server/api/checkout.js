'use strict'
const api = require('express').Router()
const nodemailer = require('nodemailer')

api.route('/')
    .post(function (req, res) {
        console.log(req.body)
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user: 'testemail.gracehopperstudent@gmail.com',
                pass: 'c0d3g3@ss'
            }
        });
        let textbody = 'Your order of ' + req.body.order.title + ' has been placed!'
        let email = req.body.recipient.email
        let mailOptions = {
            from: '"Order Confirmation" <testemail.gracehopperstudent@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Confirming your order', // Subject line
            text: textbody, // plain text body

        };
        transporter.sendMail(mailOptions, (error, info) => {
            //console.log("HELLO")
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        //order database interaction here
        //for now
        res.sendStatus(204)
    })

module.exports = api;