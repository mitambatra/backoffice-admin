const {Database,Schema} = require("../../../lib/database");

const ParagrapheSchema = new Schema({
  texte:"string",
  id_article:"string",
  numero:"string"
});

module.exports =Database.model(ParagrapheSchema,"paragraphe");
