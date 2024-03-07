const { getDb } = require('../db/connect');

const createUser = async (userData) => {
    const db = getDb();
    return await db.collection('users').insertOne(userData);
};

const findUserByGoogleId = async (googleId) => {
    const db = getDb();
    return await db.collection('users').findOne({ googleId });
};

module.exports = {
    createUser,
    findUserByGoogleId,
};
