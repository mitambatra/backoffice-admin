
class ValidationController {
  static adminModel(){
    const {Database} = require("../../lib/database");
    const db = new Database(process.env.ADMIN_DATABASE).connect()
    const admin = require("../models/Admin");
    return Database.model(admin,'admin',db)
  }

  validate(req,res) {
    const admin = {'identifiant':req.body.identifiant,'mdp':req.body.mdp}
    ValidationController.adminModel().findBy({'identifiant':admin.identifiant},(a)=>{
      let result = ""
      let data;
        if(a.length === 0 ){
          res.json({'res':'BAD_ID','data':data})
        }else{
          ValidationController.adminModel().findBy({'identifiant':admin.identifiant,'mdp':admin.mdp},(a)=>{
            if(a.length === 0){
              res.json({'res':'BAD_MDP','data':data})
            }else{
              data = a
              res.json({'res':'SUCCESS','data':data})
            }
          })
        }
        
    })
    
  }

  register(req,res){
    const admin = {'identifiant':req.body.identifiant,'mdp':req.body.mdp,'mail':req.body.mail,'nom':req.body.nom}
    ValidationController.adminModel().findBy({'nom':admin.nom},(a)=>{
      let result = ""
      let data;
      if(a.length !== 0){
        result = "NAME_EXISTS"
        res.json({'res':result,'data':data})
      }else{
        ValidationController.adminModel().findBy({'identifiant':admin.identifiant},(a)=>{
          if(a.length !== 0){
            result = "ID_EXISTS"
            res.json({'res':result,'data':data})
          }else{
            ValidationController.adminModel().findBy({'mail':admin.mail},(a)=>{
              if(a.length !== 0){
                result = "MAIL_EXISTS"
                res.json({'res':result,'data':data})
              }else{
                ValidationController.adminModel().insert(admin)
                result = "SUCCESS"
                res.json({'res':result,'data':admin})
              }
            })
          }
        })
      }
    })
  }

}
module.exports = new ValidationController();
