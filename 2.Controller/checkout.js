const db =require('../3.databases/mySql')

const addToCheckOut = (req,res)=>{       
   let id = req.params.id      
   let sql = `select  p.name as name,p.image_url as image, p.stock as stock , qty, p.price*qty as subtotal, users_id from carts c
   join products p on c.products_id = p.id
   join users u on c.users_id = u.id  where c.users_id=?;`

   db.query(sql,id,(err,result)=>{
       try{
           if(err) throw err
           console.log(result)
           let sql = `insert into transaction_status set name ='done';`
           db.query(sql,(err,results)=>{
            if(err) throw err
            let sql = `insert into transactions set?;`
            db.query(sql,{transaction_status_id : results.insertId, users_id : result[0].users_id, created_at :"tanggal"},(err,hasil)=>{
                result.forEach((val)=>{
                    console.log(val)
                    let sql = `insert into detail_transactions set?`
                    db.query(sql,{product_name : val.name, product_price : val.subtotal , qty : val.qty, transactions_id: hasil.insertId },(err,result)=>{
                        res.json({
                         error : true,
                         message : err.message
                     })
     
                    })
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




module.exports = {
    addToCheckOut : addToCheckOut
}