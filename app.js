var express = require("express");
var app = express();
var todoController = require("./controllers/todoController");
//setup template engine

app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

//fire controllers
todoController(app);

//listen to port
app.listen(3000, function (req, res) {
  console.log("you are listening to 3000 port");
});
