 const express = require("express")
 const mongoose = require("mongoose")
 const bodyParser = require("body-parser")

 var PORT = 3600;

 const app = express()


 app.use(bodyParser.json())
 app.use(express.static('public'))
 app.use(bodyParser.urlencoded({
    extended:true
 }))

mongoose.connect('mongodb://localhost:27017/Product_Management',{

useNewUrlParser:true,
useUnifiedTopology:true
});
var db=mongoose.connection;

db.on('error',()=> console.log("error connecting to database"))
db.once('open',()=>console.log("connected to databse"))


 


app.post('/what',(req,res)=>{
    var productname =req.body.productname;
    var description= req.body.description;
    var price =req.body.price;
    var quantityInStock= req.body.quantityInStock




var data ={
"productname":productname,
"description":description,
"price":price,
"quantityInStock":quantityInStock
}
db.collection('Product').insertOne(data,(err,collection)=>{
    if(err){8
        throw err

    }
    console.log("record inserted succesfully");
});

return res.redirect('success.html')


})

app.get('/',(req,res) =>{
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect('one.html')
})




 app.listen(PORT,(req,res)=>{
    console.log("connecte sucesfully")
 })