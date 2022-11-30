const BlogPost = require('../models/blogpost');
const User = require('../models/user');

module.exports.displayblog = async function(req, res){
  //console.log(req.user);
  //fetch data from DB and display on FE
  let blog = await BlogPost.find({})
  .populate('user');
  
  //console.log(blog);
  return res.render('index', {
    BlogPost: blog,
    title: 'Home'
  });
 

}

//redirect to blog page
module.exports.addBlog = (req, res) => {
  
  return res.render('add-blog',{
    title: 'Add Blog'
  });
  
}

//create Blog
module.exports.createBlog = (req, res) => {

  
  
  //Populate mongo DB
  var datetime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
  //console.log(datetime);
  BlogPost.create({
    blogTitle: req.body.blogTitle,
    blogContent:req.body.blogContent,
    blogDate: datetime.slice(0,10),
    blogAuthor: req.user.name
  }, function(err, newBlogPost){
    if(err){
      console.log('Error in creating a blog post', err.message);
      return;
    }

    return res.redirect('/');
  })
}

//view blog
module.exports.viewBlog = async (req,res) => {
  try{
    let blog = await BlogPost.findById(req.query.id);
    if(blog){
      //console.log(blog);
      res.render('view-blog',{
        id: blog._id,
        title: blog.blogTitle,
        content: blog.blogContent,
        date: blog.blogDate,
        author: blog.blogAuthor

      });
    }
  }catch(err){
    if(err){
      console.log(err.message);
      return res.redirect('/');
    }
  }
  
}

//delete a blog
module.exports.deleteBlog = (req, res) => {

    //fetching the id
    let id = req.query.id;

    BlogPost.findByIdAndDelete(id, function(err){
      if(err){
        console.log('Error deleting blog');
        return;
      }
      return res.redirect('back');
    }, function(err, newBlogPost){
      if(err){
        console.log('Error liking the blog post');
        return;
      }
  
      return res.redirect('/');
    });

}



//render signup page
module.exports.signup = (req, res) => {
  return res.render('sign-up',{
    title: 'Sign Up'
  });
}

//render login
module.exports.login = (req, res) => {
  return res.render('login', {
    title: 'Login'
  });
}


module.exports.createUser = async (req, res) => {
  try{
    //if password and confirm password does not matches - redirect back to the signup page
    if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
    }

    let user = await User.findOne({email:req.body.email});

    //if user doesn't exist - create the user and redirect to login page
    if(!user){
      await User.create(req.body);
      return res.redirect('/login');
    }else{
      //if user/email exists - redirect back
      return res.redirect('back');
    }
  }catch(err){
    if(err){
      console.log('ERROR: ', err.message);
    }
  }

}

//login and create session for the user
module.exports.createSession = (req, res) => {
  return res.redirect('/');
}

//logout
module.exports.destroySession = (req, res) => {
  req.logout((err) => {
    if(err) { return next(err);}
    res.redirect('/');
  })
}