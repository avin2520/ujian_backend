const db =require('../3.databases/mySql')

const getDataProducts = (req,res)=>{
    let id = req.params.id    
    let sql = 'select * from products where store_id= ? and is_deleted = 0;'

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


// const addProduct = (req,res)=>{
//     let data = req.body
    
//     let sql='insert into products set ?;'

//     db.query(sql,data,(err,result)=>{
//         try{
//             if(err) throw err
//             console.log(result)
//             res.json({
//                 error:false,
//                 message : "add data berhasil",
//                 data : data
//             })
//         }catch(err){
//             res.json({
//                 error:true,
//                 message:err.message
//             })
//         }
//     })
// }

const editDataProduct = (req,res)=>{
    let data = req.body
    let id = req.params.id
    let sql = 'update products set ? where id = ?'
    db.query(sql,[data,id],(err,result)=>{
        console.log('enter')
        try{
            if(err) throw err           
            res.json({
                error:false,
                message : 'edit success',
                data : data
                
            })

        }catch(err){
            res.json({
                error:true,
                message:err.message

            })
        }
    })
    
}

const deleteProductById = (req,res)=>{
    let id = req.params.id
    let sql = 'update products set is_deleted = 1 where id=?;'
    db.query(sql,id,(err,result) => {
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
}

module.exports = {
//    addProduct : addProduct,
   getDataProducts : getDataProducts,
   deleteProductById : deleteProductById,
   editDataProduct : editDataProduct
 }