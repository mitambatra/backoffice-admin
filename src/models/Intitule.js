const {Database,Schema} = require("../../lib/database");

const IntituleSchema = new Schema({
  titre:"string",
  id_thematique:"string",
  id_type:"string"
});

module.exports =Database.model(IntituleSchema,"intitule");
