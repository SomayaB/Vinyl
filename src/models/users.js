const db = require('./db/queries/users');
const { encryptPassword, comparePasswords } = require('../utils');

const create = (name, email, password) => {
  return encryptPassword(password)
  .then(encryptedPassword => {
    return db.create(name, email, encryptedPassword);
  });
};


module.exports = {
  create,
  findByEmail: db.findByEmail,
  findById: db.findById,
  findInfoByUserId: db.findInfoByUserId
};
