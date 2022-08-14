//require express 
const express = require('express');
const port = 8080;
const path = require('path');


const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//middleware to use assets
app.use(express.static('assets'));

//middleware
app.use(express.urlencoded());


//displaying index.ejs
app.get('/', function(req, res){
  return res.render('index',{
    Blogpost: blogPost
  });
})

app.get('/add-blog', function(req, res){
  
  return res.render('add-blog');
})

app.post('/add-blog', function(req, res){
  //console.log(req.body);
  var datetime = new Date();
  //console.log(datetime.toISOString().slice(0,10));
  blogPost.push({
    blogTitile: req.body.blogTitle,
    blogContent:req.body.blogContent,
    blogDate: datetime.toISOString().slice(0,10),
    blogAuthor: req.body.blogAuthor
  })
  return res.redirect('/');
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
    blogTitile: 'How to add gradient in CSS',
    blogContent:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    blogDate: '10-07-2022',
    blogAuthor: 'Tejash'
  },
  {
    blogTitile: 'How to add colors in CSS',
    blogContent:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    blogDate: '16-08-2022',
    blogAuthor: 'Tejash Raj'
  },
  {
    blogTitile: 'How to add background in CSS',
    blogContent:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    blogDate: '15-09-2021',
    blogAuthor: 'Tejash Raj Vardhan'
  }
]