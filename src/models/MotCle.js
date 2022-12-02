const {Database,Schema} = require("../../../lib/database");

const MotCleSchema = new Schema({
  nom:"string"
});

module.exports =Database.model(MotCleSchema,"mot_cle");
