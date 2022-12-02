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
  
}
module.exports = new ValidationController();
