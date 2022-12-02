const lib =  require("./lib/index");
const Model = require("./models/Model");
const Schema = require("./models/Schema");
const fs = require("fs");
const {cwd} = require("process");
const path = require("path");
const databaseFolderRoot = path.join(cwd(),".data");

class Database{
  pathDatabase;
  //objet constructor && init a database instance
  constructor(database_name){

    this.pathDatabase = path.join(databaseFolderRoot,database_name);

      if(!fs.existsSync(databaseFolderRoot)){

        fs.mkdirSync(databaseFolderRoot);
        lib.createFolder(path.join(databaseFolderRoot,database_name));
        console.log(`Database ${database_name} created...`);
      }else{
        //const stats= fs.statSync(databaseFolderRoot);
        //const stats = fs.statSync(path.join(databaseFolderRoot,database_name));
        if(!fs.existsSync(path.join(databaseFolderRoot,database_name))){
            lib.createFolder(path.join(databaseFolderRoot,database_name));
            console.log(`Database ${database_name} created...`);
        }else{
          console.log(`Database ${database_name} already exist...`);
        }


      }


  }
  connect(){
      console.log(databaseFolderRoot);
      this.dataconfig=path.join(this.pathDatabase,"database.json")
      if(!fs.existsSync(this.dataconfig)){
        fs.appendFileSync(path.join(this.pathDatabase,"database.json"),"{}");
      }
      this.ok = true;
      console.log("Connected...ok");
      return this.pathDatabase;


  }
static  model(schema,name,prop){

  let mydatabase = new Database(process.env.DATABASE||"YourDatabase");
  const connexion = mydatabase.connect()
  console.log("hello");
    let databaseConfigJson = require(path.join(prop||connexion,"database.json"));
    if(!databaseConfigJson[name]){
      if (prop||connexion) {
        const pathModel = path.join(prop||connexion,name);
        if(!fs.existsSync(pathModel)){
          fs.mkdirSync(pathModel);
          fs.appendFileSync(path.join(pathModel,".structure"),JSON.stringify(schema))
          console.log(`Model ${name} created`);
        }else{
          if(!fs.existsSync(path.join(pathModel,".structure"))){
            fs.appendFileSync(path.join(pathModel,".structure"),JSON.stringify(schema))
          }
          console.log(`Model ${name} already exist`);
        }
        return new Model({...schema,pathModel:pathModel});
      }else{
        console.log("not ok");
        return null;
      }
    }
  }

}

module.exports = {
  "Database":Database,
  "Schema":Schema
};
