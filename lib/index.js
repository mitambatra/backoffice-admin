let {Database,Schema} =  require("./database")

const categorie = require("./indexModel");
const contenu = require("./Contenu");

categorie.insert({"nom":"Yuka","age":22,"prenom":"Kuro"})
contenu.insert({"nom":"Yuka","age":22,"prenom":"Kuro"})
// categorie.all(function(listes){
//   console.log(listes);
// })
// categorie.findBy({"nom":"true"},function(liste){
//   console.log(liste);
// });
// categorie.findAndDelete({"_id":"1b54ad5d480ed6eaaa01873bb9510f18"},function(success){
//   console.log(success);
// });
categorie.findAndUpdate({"nom":"1u"},{"premon":"f"},function(success){
  console.log(success);
})
