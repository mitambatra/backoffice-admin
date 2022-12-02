class Schema{
  constructor(database,structure){
    for (var variable in structure) {
      if (structure.hasOwnProperty(variable)) {
        this[variable] = structure[variable];
      }
    }
    this.database = database;

  }

}

module.exports =Schema;
