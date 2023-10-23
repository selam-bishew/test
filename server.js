// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const cors = require('cors')

const port = 4700;

app.use(cors());

// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/Product_Management';

app.use(express.static('public'));

app.get('/data', (req, res) => {
    MongoClient.connect(mongoURL, (err, client) => {
        if (err) {
            res.status(500).send('Error connecting to the database');
            return;
        }

        const db = client.db('Product_Management');
        const collection = db.collection('Product');

        collection.find().toArray((err, data) => {
            if (err) {
                res.status(500).send('Error fetching data from the database');
            } else {
                res.json(data);
            }

            client.close();
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
