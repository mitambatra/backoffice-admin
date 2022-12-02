const {Database,Schema} = require("../../lib/database");

const ThematiqueSchema = new Schema({
  titre:"string",
  langue:"string",
  id_theme_langue:"string"
});

module.exports =Database.model(ThematiqueSchema,"thematique");
