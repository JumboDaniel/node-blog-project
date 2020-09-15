const express = require('express');
const router = express.Router();
const Blog = require ('../models/blog');

//routes
router.get('/',(req, res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {title: 'Home', blogs:result})                 
    })
    .catch((err)=>{
        console.log(err)
    })

});

router.post('/blogs', (req, res)=>{
    const blog = new Blog (req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/')
    })
    .catch((err)=>{console.log(err)})
});

router.get('/blog/create',(req, res)=>{
    res.render('create', {title: 'Create New Post'})
}); 

router.get(('/blogs/:id'), (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{
        res.render('details', { blog: result, title: 'Blog Details'})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
router.get('/about',(req, res)=>{
    console.log('Server is running')
    res.render('about', {title: 'About'})
});


//redirects
router.get('/about-us', (req, res)=>{
    res.redirect('/about')
 })

 module.exports = router;
