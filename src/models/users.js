const db = require('./db/queries/users');
const { encryptPassword, comparePasswords } = require('../utils');

const create = (name, email, password) => {
  return encryptPassword(password)
  .then(encryptedPassword => {
    return db.create(name, email, encryptedPassword);
  });
};

const findByEmail = (email) => {
  return db.findByEmail(email);
};

const findById = (id) => {
  return db.findById(id);
};

const findInfoByUserId = (userId) => {
  return db.findInfoByUserId(userId);
};

module.exports = {
  create,
  findByEmail,
  findById,
  findInfoByUserId
};
