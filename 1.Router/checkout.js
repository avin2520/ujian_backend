const Router = require('express').Router()
const controller = require('../2.Controller/checkout')

Router.post('/:id',controller.addToCheckOut)




    


module.exports= Router