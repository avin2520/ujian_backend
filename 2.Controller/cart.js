const db =require('../3.databases/mySql')


const addToCart= (req,res)=>{
    let id = req.params.id  
    console.log(id)
    let data= req.body  
    let qty =data.qty
    console.log(qty)

    let sql = 'select * from products where id= ?;'    
    db.query(sql,id,(err,result)=>{
        try{
            if(err) throw err
            console.log(result)

            let sql = `select * from store where id= ${result[0].store_id};`
            console.log(sql)
            db.query(sql,(err,hasil)=>{
                console.log(hasil)
                //let sql = `insert into carts set ?;`
                let sql =`insert into carts (products_id,users_id,qty)
                values (${id},${hasil[0].users_id},${qty});`
                //let data = {products_id : id, users_id : hasil[0].users_id , qty:qty}
                db.query(sql,(err,output)=>{
                    console.log(sql)
                    res.json({
                        error : false,
                        message : "input cart success"
                    })
    
                })
    
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
        
    })    

}

const getDataCartsByUsersId= (req,res)=>{
    let id = req.params.id    
    let sql = `select  p.name as name,p.image_url as image, p.stock as stock , qty, p.price*qty as subtotal  from carts c
    join products p on c.products_id = p.id
    join users u on c.users_id = u.id  where c.users_id=?;`

    db.query(sql,id,(err,result)=>{
        try{
            if(err) throw err
            res.json({
               error : false,
               data : result
                
            })

        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}


const deleteCartsById = (req,res)=>{
    let id = req.params.id
    let sql = 'delete from carts where id =?'
    db.query(sql,id,(err,result) => {
        try{
            if(err) throw err
            let sql = 'select * from carts;'
            db.query(sql,(err,result) => {
                try{
                    if(err) throw err
                    res.json({
                        error:false,
                        message : 'delete data success',
                        data : result
                        
                    })

                }catch(err){
                    res.json({
                        error:true,
                        message:err.message        
                    })
                }

            })         

        }catch(err){
            res.json({
                error:true,
                message:err.message

            })
        }
    })
}

module.exports = {
    addToCart : addToCart,
 deleteCartsById : deleteCartsById,
 getDataCartsByUsersId : getDataCartsByUsersId
}
