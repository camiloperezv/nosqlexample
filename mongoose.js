const mongoose = require("mongoose");
module.exports = function() {
  let db = mongoose.connect('mongodb://localhost/empiricus/');
  require("./models/user.server.model");
  return db;
};
