const api = require('express').Router()
const db = require('../db')
const Order = db.models.order


const orders = []

api.route('/')
    .get((res, req, next)=> {
         Order.findAll({
             where: {
                 user: req.user.id 
             },
             order: [
                 'updatedAt', 'DESC'
             ]
         })
         .then(orders=>{
            console.log('orders', orders) 
            return res.json(orders)
            })
         .catch(next)
    })

    module.exports=api