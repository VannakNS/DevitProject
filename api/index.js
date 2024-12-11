const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));


require('./src/route/aboute.route')(app)
require('./src/route/contact.route')(app)
require('./src/route/bloge.route')(app)
require('./src/route/home.route')(app)

const port = 8081;
app.listen(port, () => {
  console.log("http://localhost:" + port);
});
