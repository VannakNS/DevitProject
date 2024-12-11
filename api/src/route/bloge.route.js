const { getlist, create, update, remove } = require("../controller/blog.controller")
const { upload } = require("../util/helper")

module.exports = (app)=>{
    app.get("/api/blog",getlist)
    app.post("/api/blog",upload.single("upload"),create)
    app.put("/api/blog",upload.single("upload"),update)
    app.delete("/api/blog/:id",remove)
}