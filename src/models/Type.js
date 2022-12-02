const {Database,Schema} = require("../../lib/database");

const TypeSchema = new Schema({
  nom:"string",
  langue:"string",
  id_type_langue:"string"
});

module.exports =Database.model(TypeSchema,"type");
