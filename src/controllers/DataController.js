class Data {
  newData(req,res){
    const Theme = require("../models/Thematique");
    Theme.insert({titre:"Mytheme"},function(){
      res.send("ok")
    })
  }

  getAllTheme(req,res){
    const Theme = require("../models/Thematique");
    Theme.all(function(allTheme){
      res.json(allTheme);
    })
  }
  getAllType(req,res){
    const Type = require("../models/Type");
    Type.all(function(allTheme){
      res.json(allTheme);
    })
  }
}
module.exports = new Data();
