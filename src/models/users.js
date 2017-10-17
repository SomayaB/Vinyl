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

module.exports = {
  create,
  findByEmail
};
