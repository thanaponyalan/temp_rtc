var mongoose=require('./config/mongoose');
var express=require('./config/express');

var db=mongoose();
var app=express();
app.listen(3009);
module.exports=app;

console.log('Server running at http://localhost:3009');
