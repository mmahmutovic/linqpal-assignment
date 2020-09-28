const db = require('./db');
const users = require('./data.json');

const { User } = db;

User.insertMany(users);
