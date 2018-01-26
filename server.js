var express = require('express');
var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;
var bodyParser = require('body-parser');
var db = mongojs('fullstack',['todos']);
var app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get('/api',function (req,res) {
  db.todos.find({},function (err,docs) {
    res.send(docs);
  })
})

app.post('/deleteTodo',function (req,res) {
  var id = req.body.id;
  db.todos.remove({_id:ObjectId(id)},function (err,docs) {
    db.todos.find({},function (err,docs) {
      res.send(docs);
    })
  })
})

app.post('/addTodo',function (req,res) {
  var msg = req.body.msg;
  db.todos.insert({msg:msg},function (err,docs) {
    if(err){ throw err }
    db.todos.find({},function (err,docs) {
      res.send(docs);
    })
  })
})

app.listen(80,function () {
  console.log("Listening on port 3000");
})
