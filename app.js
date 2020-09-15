const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require ('./models/blog');
const { render } = require('ejs');
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


//routes
app.get('/',(req, res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {title: 'Home', blogs:result})                 
    })
    .catch((err)=>{
        console.log(err)
    })

});

app.post('/blogs', (req, res)=>{
    const blog = new Blog (req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/')
    })
    .catch((err)=>{console.log(err)})
});

app.get(('/blogs/:id'), (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{
        res.render('details', { blog: result, title: 'Blog Details'})
    })
    .catch(err=>{
        console.log(err)
    })
})
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
