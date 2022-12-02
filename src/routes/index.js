module.exports=function(app){
  //add routes parent here
  app.use("/api",require("./api/index.router"))
  app.use("/console",require("./console/index.router"))
  app.use("/web",require("./web/index.router"))

}
