const mongoose = require('mongoose');
const DB_URL = `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const db = mongoose.connection;

mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

db.on('error',console.error.bind(console,"error in database"));

db.on('reconnected', () => {
    console.log('Mongo has reconnected')
});

db.on('disconnected', () => {
    console.log('Mongo connection is disconnected')
});

db.once('open',function(){

    console.log("connected to the database");
});


module.exports = db;
