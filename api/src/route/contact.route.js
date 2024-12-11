const { getlist, create, update, remove } = require("../controller/contact.controller")

module.exports = (app)=>{
    app.get("/api/contact",getlist)
    app.post("/api/contact",create)
    app.put("/api/contact",update)
    app.delete("/api/contact/:id",remove)
}