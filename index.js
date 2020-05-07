const express = require('express')
const app = express()
const PORT = 5000
const cors = require('cors')

const db = require('./3.databases/mySql')
const manageRouter = require('./1.Router/manageProduct')
const detailRouter = require('./1.Router/detailProduct')
const cartRouter = require('./1.Router/cart')
const coRouter = require('./1.Router/checkout')
db.connect()

app.use(express.json())
app.use(cors())

app.use('/manage',manageRouter)
app.use('/detail',detailRouter)
app.use('/cart',cartRouter)
app.use('/checkout',coRouter)

app.get('/',(req,res)=>{
    res.send('<h1>Selamat datang di API File Upload System</h1>')
})


app.get('/seller/:id', (req,res)=>{
    let id = req.params.id   
    let sql = 'select * from products where id= ?;'
    
        db.query(sql,id,(err,result)=>{
            try{
                if(err) throw err               
                console.log(result)
                let sql = `select * from products where store_id = ${result[0].store_id} and is_deleted = 0`
                db.query(sql,(err,hasil)=>{
                    res.json(hasil)

                })             
    
            }catch(err){
                res.json({
                    error : true,
                    message : err.message
                })
            }
        })    
})


app.listen(PORT,()=>{
    console.log('server running on port' + PORT)
})