const Router = require('express').Router()
const controller = require('../2.Controller/cart')

Router.get('/:id',controller.getDataCartsByUsersId)
Router.post('/:id',controller.addToCart)
Router.delete('/:id',controller.deleteCartsById)


    


module.exports= Router