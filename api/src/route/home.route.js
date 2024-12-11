const { getlist, create, update, remove } = require("../controller/home.controller")
const { upload } = require("../util/helper")

module.exports = (app)=>{
    app.get("/api/home",getlist)
    app.post("/api/home",upload.single("upload"),create)
    app.put("/api/home",upload.single("upload"),update)
    app.delete("/api/home/:id",remove)
}