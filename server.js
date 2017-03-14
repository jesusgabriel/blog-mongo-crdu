var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Blog = require('./blog.js');
var db = 'mongodb://localhost/library';

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/blog', function(req, res){
Blog.find({}).exec(function(err, blog) {
  if (err) {
    console.log("The blog not running");
  }else {
    console.log(blog);
    res.json(blog);
  }
})
});

app.post('/blog', function(req, res){
  var newpost = new Blog ();
    newpost.title = req.body.title,
    newpost.author= req.body.author,
    newpost.save(function (err, newpost) {
      if (err) {
        console.log('error has ocurred');
      }else {
      res.json(newpost)
      }
  })
});

app.put('/blog/:id', function(req, res){
  blog.findOneAndUpdate({
    _id: req.params.id},{$set:{title:req.body.tile, author:req.body.author}}).exec(function(err, blog){
      if (err) {
        console.log("not running");
      }else {
        res.json(blog);
      }
    });
});






app.listen(3000);
