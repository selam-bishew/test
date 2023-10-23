const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const PORT = 5000;

const app = express();

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



app.post('/delete', (req, res) => {
    const productname = req.body.productname;

    db.collection('Product').deleteOne({ productname:(productname) }, (err, result) => {
        if (err) {
            console.error('Error deleting data: ', err);
            return res.status(500).send('Error deleting data');
        }
        console.log('Data deleted successfully');
        return res.status(200).send('Data deleted successfully');
    });
});



app.get('/',(req,res) =>{
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect('two.html')
})





app.listen(PORT,(req,res)=>{
    console.log("good connection")
})