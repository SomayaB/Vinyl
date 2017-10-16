const db = require("../../db/index");

const getAlbums = () => {
  return db.any(`SELECT * FROM albums`)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const getAlbumsByID = (albumId) => {
  return db.any(`
    SELECT * FROM albums
    WHERE id = $1
    `, albumId)
  .catch(error => {
      console.error(error.message, "The argument is:::", albumId);
      throw error;
    });
};


module.exports = {
  getAlbums,
  getAlbumsByID,
};
