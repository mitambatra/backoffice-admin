const {Database,Schema} = require("../../lib/database");

const MotCleChapitreSchema = new Schema({
  id_chapitre:"string",
  id_mot_cle:"string"
});

module.exports =Database.model(MotCleChapitreSchema,"mot_cle_chapitre");
