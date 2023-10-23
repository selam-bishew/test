const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

var PORT = 2800;

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




// ... (your existing code)

// Route for updating a product by productname
app.post('/update', (req, res) => {
    const { productname, description, price, quantityInStock } = req.body;

    // Define the update object with the new data
    const updateData = {
        
       productname,
        description,
        price,
        quantityInStock,
    };

    db.collection('Product').findOneAndUpdate(
        { productname:productname }, // Filter by productname
        { $set: updateData }, // Update data
        { new: true }, // Return the updated document
        (err, result) => {
            if (err) {
                console.error('Error updating product:', err);
                res.status(500).send('Error updating product');
            } else {
                if (result.value) {
                    console.log('Product updated successfully:', result.value);
                    res.redirect('success.html'); // Redirect to a success page or the desired destination
                } else {
                    console.log('Product not found');
                    res.status(404).send('Product not found');
                }
            }
        }
    );
});

// ... (your existing code)


app.get('/',(req,res) =>{
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect('update.html')
})





app.listen(PORT,(req,res)=>{
    console.log("connected to thiss")
})