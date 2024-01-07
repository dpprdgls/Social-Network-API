const { connect, connection } = require('mongoose');

//create the database
const connectionString = 
process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialDB";

//connect mongoose and mongoDB
connect(connectionString);

module.exports = connection;

