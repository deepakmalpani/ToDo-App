var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Connect to the database
var mongoDB = "mongodb://127.0.0.1/todo";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Create a schema
var todoSchema = new mongoose.Schema({
  item: String,
});

var Todo = mongoose.model("Todo", todoSchema);

//var data = [{ item: "get milk" },{ item: "walk 3km" },{ item: "do some coding" },];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/todo", async function (req, res) {
    //get data from mongodb and pass it to view
    await Todo.find({})
      .then((data) => {
        res.render("todo", { todos: data });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.post("/todo", urlencodedParser, async function (req, res) {
    //get data from the view and add it to mongodb
    await Todo(req.body)
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.delete("/todo/:item", async function (req, res) {
    //delete the requested data from mongodb
    await Todo.find({ item: req.params.item.replace(/\-/g, " ") })
      .deleteOne()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
