const { getDb } = require('../db/connect');

const createUser = async (userData) => {
    const db = getDb().db();
    return await db.db.collection('users').insertOne(userData);
};

const findUserByGoogleEmail = async (email) => {
    const db = getDb().db();
    return await db.collection('users').findOne({ email });
};

module.exports = {
    createUser,
    findUserByGoogleEmail,
};
