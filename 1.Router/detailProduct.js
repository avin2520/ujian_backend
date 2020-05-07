const Router = require('express').Router()
const controller = require('../2.Controller/detailProduct')

Router.get('/:id',controller.getDataProductById)
Router.get('/seller/:id',controller.getDataProductById)
// Router.post('/',controller.addNewProduct)
// Router.patch('/:id',controller.editDataProduct)
// Router.delete('/:id',controller.deleteMovieById)


    


module.exports= Router