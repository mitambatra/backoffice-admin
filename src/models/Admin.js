const {Database,Schema} = require("../../lib/database");


const Adminchema = new Schema({
  nom:"string",
  identifiant:"string",
  mail:"string",
  mdp:"string",
});

module.exports = Adminchema
