module.exports = app => {
    const user = require("../controllers/mongo.controller.js");
    var router = require("express").Router();
    //crea nuevo user
    router.post("/", user.creaU);
    //muestra todos los user 
    router.get("/", user.buscaU);
    //borra user por id
    router.delete("/:id", user.borraIdU);

    app.use('/api/users', router);
  };