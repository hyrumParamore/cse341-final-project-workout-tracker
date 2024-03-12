const { getDb } = require('../db/connect');

const createUser = async (userData) => {
    const db = getDb();
    try {
        return await db.collection('users').insertOne(userData);
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

const findUserByGoogleEmail = async (email) => {
    const db = getDb();
    return await db.collection('users').findOne({ email });
};

module.exports = {
    createUser,
    findUserByGoogleEmail,
};
