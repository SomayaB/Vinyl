const pgp = require("pg-promise")();
const { Map } = require('immutable');
const config = require("../../config/config").getConfig();

const connectionObject = {
  host: config.get("db").get("host"),
  port: config.get("db").get("port"),
  database: config.get("db").get("name")
};

const db = pgp(connectionObject);

db.connect()
    .then(obj => {
        console.log("db is connected");
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

module.exports = db;



//move to separate query files
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
