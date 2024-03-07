const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// Define the User schema
const userSchema = {
    googleId: String,
    displayName: String,
    email: String,
    password: String // You can add a password field if you want users to set a password later
};

// Create a function to connect to the database
// const connectToDb = async () => {
//     const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true });
//     await mongodb.initDb;
//     return client.db();
// };

// Create a function to insert a new user into the database
const createUser = async (userData) => {
    const db = await mongodb.initDb;
    const result = await db.collection('users').insertOne(userData);
    return result.insertedId;
};

// Create a function to find a user by their Google ID
const findUserByGoogleId = async (googleId) => {
    const db = await mongodb.initDb;
    return db.collection('users').findOne({ googleId });
};

// Create a function to find a user by their ID
const findUserById = async (userId) => {
    const db = await mongodb.initDb;
    return db.collection('users').findOne({ _id: ObjectId(userId) });
};

module.exports = {
    userSchema,
    createUser,
    findUserByGoogleId,
    findUserById,
};