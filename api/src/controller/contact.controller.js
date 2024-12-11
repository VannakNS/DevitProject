const { db } = require("../util/helper");
const { logError } = require("../util/logerror")

exports.getlist = async(req,res) =>{
    try{
        var sql = "SELECT * FROM contact";
        const [data] = await db.query(sql)
        res.json({
            message: "get list done",
            data:data
        })
    }catch(error){
        logError("getlist.contacte",error,res)
    }
}


exports.create = async(req,res) =>{
    try{
        var sql = "INSERT INTO contact (username,description,phone,is_active,create_by) VALUES (:username,:description,:phone,:is_active,'Vannak')"
        const [data] = await db.query(sql,{...req.body})
        res.json({
            message: "Create done",
            data:data
        })
    }catch(error){
        logError("create.contacte",error,res)
    }
}


exports.update = async(req,res) =>{
    try{
        var sql = "UPDATE contact SET username = :username, description = :description, phone = :phone, is_active = :is_active WHERE id = :id";
        const [data] = await db.query(sql,{id:req.body.id,...req.body})

        res.json({
            message: "update done",
            data:data
        })
    }catch(error){
        logError("update.contacte",error,res)
    }
}


exports.remove = async(req,res) =>{
    try{
        var sql = "DELETE  FROM contact WHERE id=:id"
        const [data] = await db.query(sql,{id:req.params.id})

        res.json({
            message: "delete done",
            data:data
        })
    }catch(error){
        logError("remove.contacte",error,res)
    }
}