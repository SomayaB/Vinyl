const db = require("../../db/index");

const create = (name, email, password) => {
  return db.oneOrNone(`
    INSERT INTO
      users (name, email, encrypted_password)
    VALUES
      ($1, $2, $3)
    RETURNING
      *
    `, [ name, email, password ])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const findByEmail = (email) => {
 return db.oneOrNone(`
   SELECT * FROM users
   WHERE email = $1
   `, email)
  .catch(error => {
    console.error(error.message, "The argument is:::", email);
    throw error;
  });
};

module.exports = {
  create,
  findByEmail
};
