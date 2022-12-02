const fs = require("fs");
const path = require("path");

class Model{
  constructor(schema){
    this.proprieties = schema["database"];
    this.pathModel = schema["pathModel"];

  }
  all(callback){
    let pathModelTemp = this.pathModel;
    fs.readdir(pathModelTemp,function(err,listes){
      let contents = [];
      listes.forEach((item) => {
        if(item[0]!=="."){
          const jsonFile = require(path.join(pathModelTemp,item));
          contents.push(jsonFile);
        }
      });
      callback(contents);
    })
  }
  findBy(filterObject,callback){
    //console.log(filterObject);
    const proprietiesTemp = this.proprieties;
    const pathModelTemp = this.pathModel;
    let contents = [];
        this.all(function(listes){
          let boolTemp = true;
          contents = listes.filter(function(item){
          for (var variable in filterObject) {
            if (item.hasOwnProperty(variable)) {
              boolTemp =filterObject[variable] === item[variable];
            }
          }
          return boolTemp
          });
          callback(contents);
        })

  }
  insert(newValue){
    for (var variable in newValue) {
      const typeOfNew = typeof(newValue[variable]);

      if (this.proprieties.hasOwnProperty(variable)) {
        const proprietyType = this.proprieties[variable].toString().toLowerCase()

        if( proprietyType === typeOfNew){
            const listeFiles = fs.readdirSync(this.pathModel);
            if(!listeFiles.length <=1){
              const randomHex = require("crypto").randomBytes(16).toString('hex')
              let newData = {...this.proprieties};
              for (var variable in newData) {
                if (newValue.hasOwnProperty(variable)) {
                    newData[variable] = newValue[variable];
                }else{
                  newData[variable]=null;
                }
              }
              newData = {_id:randomHex,...newData}
              fs.appendFileSync(path.join(this.pathModel,`${newData._id}.json`),JSON.stringify(newData))
              return true;

            }
        }else{
          throw new Error("Invalid propriety type "+typeOfNew+" found excepted "+proprietyType);
          return false;
        }

      }else{

        throw new Error("Propriety not found")
        return false;
      }
    }

  }
  findAndUpdate(filterObject,valueObjet,callback){
    const proprietiesTemp = this.proprieties;
    const pathModelTemp = this.pathModel;
    let contents = [];
        this.all(function(listes){
          listes.forEach((item) => {
            for (var variable in filterObject) {
              if (item.hasOwnProperty(variable)) {
                if(item[variable]===filterObject[variable]){
                  const itemTemp = item;
                  //------------
                  for (var variable in valueObjet){
                    const typeOfNew = typeof(valueObjet[variable]);

                    if (proprietiesTemp.hasOwnProperty(variable)) {
                      const proprietyType = proprietiesTemp[variable].toString().toLowerCase()
                      if (typeOfNew === proprietyType) {
                        if(variable!=="_id"){
                        itemTemp[variable] = valueObjet[variable];
                      }else{
                        throw new Error("You cannot updata _id");
                        callback(false);
                      }


                    }else {
                      throw new Error("Invalid propriety type "+typeOfNew+" found excepted "+proprietyType);
                      callback(false);
                      }


                    }else{
                      console.log(variable);

                      //throw new Error("Propriety not found")
                      callback(false);
                    }
                  }

                  fs.writeFile(path.join(pathModelTemp,`${item._id}.json`),JSON.stringify(item),function(err){
                    if(err){
                      callback(false)
                    }else{
                      callback(true)
                    }

                  });

                  //------------
                }
              }
            }
          });

        })

  }
  findAndDelete(filterObject,callback){
    const proprietiesTemp = this.proprieties;
    const pathModelTemp = this.pathModel;
    let contents = [];
        this.all(function(listes){
          listes.forEach((item) => {
            for (var variable in filterObject) {
              if (item.hasOwnProperty(variable)) {
                if(item[variable]===filterObject[variable]){
                  fs.rm(path.join(pathModelTemp,`${item._id}.json`),function(err){
                    if(err){
                      callback(false);
                    }else{
                      callback(true);

                    }
                  })
                }
              }
            }
          });

        })
  }
}
module.exports = Model;
