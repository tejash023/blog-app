//require express 
const express = require('express');
const { ConnectionCreatedEvent } = require('mongodb');
//declaring port
const port = 8080;
//require path
const path = require('path');

//require mongoose
const db = require('./config/mongoose');

//require model
const BlogPost = require('./models/blogpost');

//instantiate the express into constant app
const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//middleware to use assets
app.use(express.static('assets'));

//middleware to parse the post request
app.use(express.urlencoded());


//displaying index.ejs
app.get('/', function(req, res){

  //fetch data from DB and display on FE
  BlogPost.find({}, function(err, blogPost){
    if(err){
      console.log('Error fetching data from DB');
      return;
    }
    console.log('blogPost:', blogPost[2]);
    console.log("**********************");
    console.log('BlogPost:', BlogPost);
    return res.render('index', {
      BlogPost: blogPost
    });
  });
  
})

app.get('/add-blog', function(req, res){
  
  return res.render('add-blog');
})


//get the post request from the html form and push it into the DB
app.post('/add-blog', function(req, res){
  // -- Before DB Method
  // //console.log(req.body);
  // var datetime = new Date();
  // //console.log(datetime.toISOString().slice(0,10));
  // blogPost.push({
  //   blogTitile: req.body.blogTitle,
  //   blogContent:req.body.blogContent,
  //   blogDate: datetime.toISOString().slice(0,10),
  //   blogAuthor: req.body.blogAuthor
  // })
  // return res.redirect('/');

  //Populate mongo DB
  var datetime = new Date();
  BlogPost.create({
    blogTitle: req.body.blogTitle,
    blogContent:req.body.blogContent,
    blogDate: datetime.toISOString().slice(0,10),
    blogAuthor: req.body.blogAuthor
  }, function(err, newBlogPost){
    if(err){
      console.log('Error in creating a blog post');
      return;
    }

    return res.redirect('/');
  })
});

//starting the server
app.listen(port, function(err){
  if(err){
    console.log('Error starting the server');
    return;
  }

  console.log('Server is up and running at port: ',port);
})



//random blog data

var blogPost = [
  {
    blogTitle: 'How to add gradient in CSS',
    blogContent:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    blogDate: '10-07-2022',
    blogAuthor: 'Tejash'
  },
  {
    blogTitle: 'How to add colors in CSS',
    blogContent:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    blogDate: '16-08-2022',
    blogAuthor: 'Tejash Raj'
  },
  {
    blogTitle: 'How to add background in CSS',
    blogContent:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    blogDate: '15-09-2021',
    blogAuthor: 'Tejash Raj Vardhan'
  }
]