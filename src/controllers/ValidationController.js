const SimpleGit = require("simple-git");
const fs = require("fs")
const path = require("path");
const pathToData = path.join(__dirname,"../../.data");
const fileToIgnore = ["AdminDatabase"];
class ValidationController {
  validate(req,res) {
    if(fs.existsSync(pathToData)){
      const git = SimpleGit(pathToData);
      if(!fs.existsSync(path.join(pathToData,".git"))){
        git.init(function(){
          git.add(".",function(){
            git.commit("new update",function(){
              git.push("https://mitambatra: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@github.com/mitambatra/database.git","main",function(){
                res.json({
                  message:"success"
                })
              })
            })
          });
        });
      }else{
        git.add(".",function(){
          git.commit("new update",function(){
            git.push("https://mitambatra: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@github.com/mitambatra/database.git","master",function(err){
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
}
module.exports = new ValidationController();
