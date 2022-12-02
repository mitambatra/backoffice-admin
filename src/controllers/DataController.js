class Data {
  newData(req,res){
    const thematique = req.body.thematique;
    const type = req.body.type;
    const intitule = req.body.intitule;
    const chapitre = req.body.chapitre;
    const article = req.body.article;
    const paragraphe = req.body.paragraphe;
    if(thematique && type && intitule && chapitre && article && paragraphe){
      const id_thematique=""
      if(thematique.isNew){
          const Theme = require("../models/Thematique");
          if(thematique.titre){
            id_thematique = Theme.insert({titre:thematique.titre})._id
        }else{
          res.status(500)
          res.send("not ok")
        }

      }
    
      if(intitule.isNew){
        const Intitule = require("../models/Intitule");
        if(intitule.titre && intitule.id_thematique && intitule.id_type){

        }else{
          res.status(500)
          res.send("not ok")
        }
      }
    }

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
  getIntitule(req,res){
    if(req.body.id_thematique && req.body.id_type ){
      const Intitule = require("../models/Intitule");
      let  data = [];
      Intitule.findBy({id_thematique:req.body.id_thematique},function(intitulesByTheme){
        Intitule.findBy({id_type:req.body.id_type},function(intitulesByType){
          if(intitulesByTheme.length < intitulesByType){
            for (var i = 0; i < intitulesByTheme.length; i++) {
              if(intitulesByTheme[i]===intitulesByType[i]){
                data.push(intitulesByTheme[i])
              }
            }
          }else{
            for (var i = 0; i < intitulesByType.length; i++) {
              if(intitulesByTheme[i]===intitulesByType[i]){
                data.push(intitulesByType[i])
              }
            }
          }
          res.json(data);
        })
      })
    }else{
      res.status(404);
      res.send("Data no thematique set")
    }

  }
  getChapitre(req,res){
    if(req.body.id_intitule){
      const Chapitre = require("../models/Chapitre");
      Chapitre.findBy({id_intitule:req.body.id_intitule},function(chapitres){
        res.json(chapitres)
      })
    }else{
      res.status(404);
      res.send("Data no Initulé set")
    }
  }
  getArticle(req,res){
    if(req.body.id_chapitre){
      const Article = require("../models/Article");
      Article.findBy({id_chapitre:req.body.id_chapitre},function(articles){
        res.json(articles)
      })
    }else{
      res.status(404);
      res.send("Data no Initulé set")
    }
  }
}
module.exports = new Data();
