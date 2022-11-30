const { type } = require('express/lib/response');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    
  },
  name : {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogPost'
    }
  ]
},{
  timestamps:true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
