const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require ('./models/blog');
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
app.use(morgan('dev'));

//mongoose and mongo route
app.get('/add-blog', (req,res)=>{
    const blog = new Blog({
        title: 'New Blog 2',
        snippet:'New Blog Post',
        body: 'hope you enjoy my blog post'
    });
    blog.save()
    .then((result)=>{ res.send(result)})
    .catch((err)=> { console.log(err)});
});

app.get('/all-blogs', (req, res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{console.log(err)});
});

app.get('/single-blog', (req, res)=>{
    Blog.findById('5f4f74c028403a03b89b22c4')
    .then((result)=>{res.send(result)})
    .catch((err)=>{console.log(err)});
});

//routes
app.get('/',(req, res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {title: 'Home', blogs:result})                 
    })
    .catch((err)=>{
        console.log(er)
    })

});
app.get('/about',(req, res)=>{
    console.log('Server is running')
    res.render('about', {title: 'About'})
});
app.get('/blog/create',(req, res)=>{
    res.render('create', {title: 'Create New Post'})
}); 
//redirects
app.get('/about-us', (req, res)=>{
    res.redirect('/about')
 })
 //404 page
 app.use( (req, res)=>{
    res.status(404).render('404', {title: '404'})
 })
