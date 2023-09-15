// connect to the port 5000
// const http = require('http');

// const port = 5000;

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello, Node.js server!');
// });

// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// connect to the port 5000 using express
const express = require('express');
const app = express();
const port = 5000;

// Define a route for the root path
app.get('/', (req, res) => {
    res.send('Hello, Express.js server!');
});

// Define a route for the /api path
app.get('/api', (req, res) => {
    res.send('Welcome to the API route!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// require('dotenv').config();
// const mongoose = require('mongoose');

// const MONGODB_URI = process.env.MONGODB_URI;

// mongoose.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', (error) => {
//     console.error('MongoDB connection error:', error);
// });

// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

connectToDatabase();

// Define your User schema
const UserSchema = {
    name: String,
    email: String,
    age: Number,
};

const db = client.db();

const UserCollection = db.collection('users');

module.exports = UserCollection;

// Insert a new user
async function createUser(user) {
    try {
        const result = await UserCollection.insertOne(user);
        console.log('User inserted:', result.insertedId);
    } catch (error) {
        console.error('Error inserting user:', error);
    }
}

// Find a user by ID
async function findUserById(userId) {
    try {
        const user = await UserCollection.findOne({ _id: ObjectId(userId) });
        console.log('Found user:', user);
    } catch (error) {
        console.error('Error finding user:', error);
    }
}

// Example usage
// createUser({ name: 'rahal', email: 'info@example.com', age: 27 });
// findUserById('your_user_id');

