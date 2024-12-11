const { getlist, create, update, remove } = require("../controller/aboute.controller")
const { upload } = require("../util/helper")

module.exports = (app)=>{
    app.get("/api/aboute",getlist)
    app.post("/api/aboute",upload.single("upload"),create)
    app.put("/api/aboute",upload.single("upload"),update)
    app.delete("/api/aboute/:id",remove)
}