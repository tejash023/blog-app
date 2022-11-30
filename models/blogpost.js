//require mongoose
const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const blogSchema = new mongoose.Schema({
  blogTitle:{
    type:String,
    required:true
  },
  blogContent:{
    type: String,
    required:true
  },
  blogDate:{
    type:String,
    required:true
  },
  blogAuthor:{
    type:String,
    required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
},{
  timestamps: true
});



const BlogPost = mongoose.model('BlogPost', blogSchema);

module.exports = BlogPost;


