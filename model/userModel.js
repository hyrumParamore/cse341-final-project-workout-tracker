const { getDb } = require('../db/connect');

const createUser = async (userData) => {
    const db = getDb();
    try {
        const result = await db.collection('users').insertOne(userData);
        console.log("User created:", result.ops[0]);
        return result.ops[0];
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

const findUserByGoogleEmail = async (email) => {
    const db = getDb();
    try {
        const user = await db.collection('users').findOne({ email });
        console.log("Found user:", user);
        return user;
    } catch (err) {
        console.error('Error finding user by email:', err);
        throw err;
    }
};

module.exports = {
    createUser,
    findUserByGoogleEmail,
};
