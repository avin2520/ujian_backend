const Router = require('express').Router()
const controller = require('../2.Controller/manageProduct')

Router.get('/:id',controller.getDataProducts)
// Router.post('/',controller.addProduct)
Router.patch('/:id',controller.editDataProduct)
 Router.delete('/:id',controller.deleteProductById)


    


module.exports= Router