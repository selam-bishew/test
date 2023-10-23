const express=require('express');
const mongoose=require('mongoose');
const ejs=require('ejs');
const bodyParser=require('body-parser');

const app=express();

const cor = require('cors');




app.set('view engine','ejs');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Product_Management', {

    useNewUrlParser: true,
    useUnifiedTopology: true,

  });
  const RateSchema={
      productname:String,
      discription:String,
      price:Number,
      quantityInStock:Number 
  }

  module.exports=mongoose.model('Product',RateSchema); 
  const returnn=mongoose.model('RETURNn',RateSchema,'Product');
   app.get('/',(req,res)=>{
       returnn.find({})
       .then((Product)=>{
         res.render(('product_list'),{
         proList:Product

         });
       });
    })
   
    


  .patch((err)=>{
      console.error('Error fetching UserRequest data:', err);
    res.send('error');
  })

  

  app.get('/search', async (req, res) => {
    try {
        const searchValue = req.query.value;

        
        const searchCriteria = {
            $or: [
                { quantityInStock: { $regex: searchValue, $options: 'i' } }
            ]
        };
        
        const results = await returnn.find(searchCriteria);
        res.json(results);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
  

app.listen(4900, function () {
console.log('Server is running on port ');
});


     