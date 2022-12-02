const SimpleGit = require("simple-git");
const fs = require("fs")
const path = require("path");
const pathToData = path.join(__dirname,"../../.data");
const fileToAdd = ["backoffice-database"];
class ValidationController {
  validate(req,res) {
    if(fs.existsSync(pathToData)){
      const git = SimpleGit(pathToData);
      if(!fs.existsSync(path.join(pathToData,".git"))){
        git.init(function(){
          git.add(fileToAdd,function(){
            git.commit("new update",function(){
              git.push(`https://${process.env.USERNAME}:${process.env.TOKEN}@${process.env.HOST}${process.env.REPOSISTORY}`,`${process.env.BRANCH}`,function(){
                res.json({
                  message:"success"
                })
              })
            })
          });
        })
      }else{
        git.add(".",function(){
          git.commit("new update",function(){
            git.push(`https://${process.env.USERNAME}:${process.env.TOKEN}@${process.env.HOST}${process.env.REPOSISTORY}`,`${process.env.BRANCH}`,function(err){
              if(err){
                console.log(err);
                res.json(err)
              }else{
                res.json({
                  message:"success"
                })
              }

            })
          })
        });

      }
    }

  }
  getHistoryListe(req,res){

    if(fs.existsSync(pathToData)){
      const git = SimpleGit(pathToData);
      if(fs.existsSync(path.join(pathToData,".git"))){
        let data = []
        git.log(function(err,logs){
          console.log(logs);
          logs["all"].forEach((log) => {
            console.log(new Date(log.date));
            data.push({hash:log.hash,date:log.date})
          });

          res.json(data);
        })
      }else {
        throw new Error("Error in git database");
      }
    }

  }
  
  static adminModel(){
    const {Database} = require("../../lib/database");
    const db = new Database(process.env.ADMIN_DATABASE).connect()
    const admin = require("../models/Admin");
    return Database.model(admin,'admin',db)
  }

  login(req,res) {
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
