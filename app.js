const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

const bodyparser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});
const contact = mongoose.model('Contact',contactSchema);

//EXPRESS SPECIFIC CONFIG
app.use('/static',express.static('static'));    //serving static files

//PUG SPECIFIC CONFIG
app.set('view engine', 'pug');  //set the template engine as pug
app.set('views', path.join(__dirname, 'views'));    // set the views directory

// ENDPOINTS
app.get('/',(req,res) => {
    const params = {}
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res) => {
    const params = {}
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res) => {
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
});

app.get('/about',(req,res) => {
    const params = {}
    res.status(200).render('about.pug',params);
});


//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});