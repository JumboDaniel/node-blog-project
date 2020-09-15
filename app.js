const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes')
//express
const app = express();
//connect to DB
const dbURI ='mongodb+srv://kaiser:test1234@node-project.5w34z.mongodb.net/node-tuts?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=>console.log('connected')) 
.catch((err) =>console.log(err));

app.listen(4000)
//set view engine
app.set('view engine', 'ejs');
//set up middleware & static
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));


//blog routes 
app.use(blogRoutes)
 //404 page
 app.use( (req, res)=>{
    res.status(404).render('404', {title: '404'})
 })
