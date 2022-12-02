const {Database,Schema} = require("./database");


const CategorieSchema = new Schema({
  nom:"string",
  prenom:"string",
  age:"number"
});



module.exports =Database.model(CategorieSchema,"contenu");
