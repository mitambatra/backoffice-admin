const {Database,Schema} = require("../../lib/database");


const ArticleSchema = new Schema({
  titre:"string",
  id_chapitre:"string",
});

module.exports = Database.model(ArticleSchema,"article");
