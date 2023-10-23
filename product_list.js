const express = require("express")

const mongoose = require("mongoose")
var ejs = require('ejs')
const PORT = 3100;

var app =express()
 

 app.set('view engine','ejs')

 mongoose.connect('mongodb://localhost:27017/Product_Management', { useNewUrlParser: true, useUnifiedTopology: true })


  const employSchema ={
      productname:String,
      description:String,
      price:{
        type:Number
      },
      quantityInStock:{
        type:Number
      },
    
  }

  const Products =mongoose.model('ProductManagement',employSchema,'Product')

 app.get('/',(req,res)=>{
   Products.find({})
   .then((Product) => {
       res.render('product_list', {
           proList: Product
       });
   })

   .catch((err) => {
       console.error(err);
       res.send('An error occurred while fetching data.');
   });
});



app.listen(PORT,(req,res)=>{
    console.log("connected to localhost safeliyyyyyyyy")
})

