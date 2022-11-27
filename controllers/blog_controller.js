const BlogPost = require('../models/blogpost');
const User = require('../models/user');

module.exports.displayblog = function(req, res){
  
  //fetch data from DB and display on FE
  BlogPost.find({}, function(err, blogPost){
    if(err){
      console.log('Error fetching data from DB');
      return;
    }
    
    return res.render('index', {
      BlogPost: blogPost,
      Like: 'regular'
    });
  });

}

//redirect to blog page
module.exports.addBlog = (req, res) => {
  
  return res.render('add-blog');
  
}

//create Blog
module.exports.createBlog = (req, res) => {
  
  //Populate mongo DB
  var datetime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
  console.log(datetime);
  BlogPost.create({
    blogTitle: req.body.blogTitle,
    blogContent:req.body.blogContent,
    blogDate: datetime.slice(0,10),
    blogAuthor: req.body.blogAuthor
  }, function(err, newBlogPost){
    if(err){
      console.log('Error in creating a blog post');
      return;
    }

    return res.redirect('/');
  })
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

//like a blog
module.exports.blogReact = (req, res) => {
    //fetching the id
    let id = req.query.id;
    BlogPost.findByIdAndUpdate(id,{blogLike:true},function(err){
      if(err){
        console.log('Error liking the blog post');
        return;
      }
  
      return res.redirect('/');
    });
}

//render signup page
module.exports.signup = (req, res) => {
  return res.render('sign-up');
}

//render login
module.exports.login = (req, res) => {
  return res.render('login');
}

// module.exports.createUser = (req, res) => {
//   //if password and confirm password does not matches - redirect back to the signup page
//   if(req.body.password != req.body.confirm_password){
//     return res.redirect('back');
//   }

//   //find the user using the email first before signing up - if email already exists
//   User.findOne({email:req.body.email}, function(err, user){
//     if(err){console.log('error in finding the user during signing up'); return}

//     //if user doesn't exist - create the user and redirect to login page
//     if(!user){
//       User.create(req.body, function(err, user){
//         if(err){console.log('Error in creating the user during sign up'); return}
//         return res.redirect('/login');
//       })
//     }else{
//       //if user/email exists - redirect back
//       return res.redirect('back');
//     }
//   })

// }

module.exports.createUser = async (req, res) => {
  try{
    //if password and confirm password does not matches - redirect back to the signup page
    if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
    }

    console.log(req.body)

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