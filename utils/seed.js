const { User, Thought, Reaction } = require('../models');

const mongoose = require('mongoose');

const connection = require('../config/connection');


const users = [
    {
        username: 'Colin',
        email: 'cd@gmail.com',
        thought: [],
    },
];

console.log(connection);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await User.collection.insertMany(users);

    console.table(users);
    console.infor("seeding complete");
    process.exit(0);
});