const {mkdirSync,appendFileSync} = require("fs");

module.exports={
  createFolder:(path)=>{
    mkdirSync(path.trim());
    appendFileSync("database.json","{}");
  }
}
