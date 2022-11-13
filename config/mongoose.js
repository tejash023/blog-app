//require the library
const mongoose = require('mongoose');

//connect to db
mongoose.connect(process.env.DB_URL);

//acquire the connection to check if connection is established successfully
const db = mongoose.connection;

//if error connecting
db.on('error',console.error.bind('Error connecting to the DB'));

//connection successfull
db.once('open', function(){
  console.log('Successfully connected to the Database');
})
