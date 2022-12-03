const Intitule = require("../models/Intitule")
const Chapitre = require("../models/Chapitre")
const Article = require("../models/Article")
const Paragraphe = require("../models/Paragraphe");
const { response } = require("express");


class DataController {
  newData(req,res){
    const thematique = req.body.thematique;
    const type = req.body.type;
    const intitule = req.body.intitule;
    const chapitre = req.body.chapitre;
    const article = req.body.article;
    const paragraphe = req.body.paragraphe;
    const id_thematique = DataController.manageTheme(thematique)
    const id_type = DataController.manageType(type)
    const id_intitule = DataController.manageIntitule(intitule,id_thematique,id_type)
    const id_chapitre = DataController.manageChapitre(chapitre,id_intitule)
    const id_article = DataController.manageArticle(article,id_chapitre)
                    
    Paragraphe.insert({texte:paragraphe,id_article:id_article})
    res.json('ok')
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

  static removeChapitre(id_chapitre){
      Chapitre.findAndDelete({_id:id_chapitre},(ok)=>{
        if(ok){
          const a = Article.findBy({id_chapitre:id_chapitre})
          a.forEach(article => {
            DataController.removeArticle(a._id)
          });
        }else{

        }
      })
  }

  static removeArticle(id_article){
    Article.findAndDelete({_id:id_article},(ok)=>{
      if(ok){
        const a = Paragraphe.findBy({id_chapitre:id_chapitre})
        a.forEach(p => {
          DataController.removeParagraphe(p._id)
        });
      }else{

      }
    })
  }

  static removeParagraphe(paragraphe_id){
    const Paragraphe = require("../models/Paragraphe");
      Paragraphe.findAndDelete({_id:req.body.id_paragraphe},(success)=>{
        if(success){res.json('deleted')}
          else{res.json('error')}
      })
  }

  static removeIntitule(id_intitule){
    Intitule.findAndDelete({_id:id_intitule},(ok)=>{
      if(ok){
        const a = Chapitre.findBy({id_intitule:id_intitule})
        a.forEach(chapitre => {
          DataController.removeChapitre(chapitre)
        });
        
        
      }
    })
  }

  static manageTheme(thematique){
    const Theme = require("../models/Thematique")
    Theme.findBy({titre:thematique},(t)=>{
      if(t.length !== 0){
        return t[0]._id
      }else{
        console.log('ss');
        return Theme.insert({titre:thematique})._id
      }
    })
  }

  static manageType(type){
    const Type = require("../models/Type")
    Type.findBy({nom:type},(t)=>{
      if(t.length !== 0){
        return t[0]._id
      }else{
        return Type.insert({nom:type})._id
      }
    })
  }

  static manageIntitule(intitule,id_theme, id_type){
    Intitule.findBy({titre:intitule,id_theme:id_theme,id_type:id_type},(t)=>{
      if(t.length !== 0){
        return t[0]._id
      }else{
        return Intitule.insert({titre:intitule,id_theme:id_theme,id_type:id_type})._id
      }
    })
  }
  
  static manageChapitre(chapitre,id_intitule){
    Chapitre.findBy({titre:chapitre,id_intitule:id_intitule},(t)=>{
      if(t.length !== 0){
        return t[0]._id
      }else{
        return Chapitre.insert({titre:chapitre,id_intitule:id_intitule})._id
      }
    })
  }

  static manageArticle(article,id_chapitre){
    Article.findBy({titre:article,id_chapitre:id_chapitre},(t)=>{
      if(t.length !== 0){
        return t[0]._id
      }else{
        return Article.insert({titre:article,id_chapitre:id_chapitre})._id
      }
    })
  }

  deleteParagraphe(req, res){
    if(req.body.id_paragraphe){
      DataController.removeParagraphe(req.body.id_paragraphe)
    }else{
      res.status(404)
    }
  }

  deleteChapitre(req, res){
    if(req.body.id_chapitre){
      
      DataController.removeChapitre(req.body.id_chapitre)
    }else{
      res.json('not_ok')
      res.status(404)
    }
  }

  deleteArticle(req, res){
    if(req.body.id_article){
      DataController.removeArticle(req.body.id_article)
    }else{
      res.json('not_ok')
      res.status(404)
    }
  }

  deleteIntitule(req, res){
    if(req.body.id_intitule){
      DataController.removeIntitule(req.body.id_intitule)
    }else{
      res.json('not_ok')
      res.status(404)
    }
  }

}
module.exports = new DataController();
