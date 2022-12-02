const {Database,Schema} = require("../../lib/database");

const ChapitreSchema = new Schema({
  titre:"string",
  id_intitule:"string"
});

module.exports =Database.model(ChapitreSchema,"chapitre");
