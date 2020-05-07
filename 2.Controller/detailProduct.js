const db =require('../3.databases/mySql')

const getDataProductById = (req,res)=>{
    let id = req.params.id
    let sql = 'select * from products where id= ? and is_deleted = 0;'

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




module.exports = {
   getDataProductById : getDataProductById
  }