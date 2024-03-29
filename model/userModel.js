const { getDb } = require('../db/connect');

const createUser = async (userData) => {
    try {
        const db = getDb().db();
        console.log("Database:", db);
        return await db.collection('users').insertOne(userData);
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

const findUserByGoogleEmail = async (email) => {
    try {
        const db = getDb().db();
        console.log("Database:", db);
        return await db.collection('users').findOne({ email });
    } catch (err) {
        console.error('Error finding user by email:', err);
        throw err;
    }
};

module.exports = {
    createUser,
    findUserByGoogleEmail,
};
