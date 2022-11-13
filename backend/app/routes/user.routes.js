module.exports = app => {
    const user = require("../controllers/mongo.controller.js");
    var router = require("express").Router();
    //crea nuevo user
    router.post("/", user.creaU);
    //muestra todos los user 
    router.get("/", user.buscaU);
    //borra user por id
    router.delete("/:id", user.borraIdU);
    //muestra user por id
    router.get("/:id", users.buscaIdU);
    //actualiza user por id
    router.put("/:id", users.actualizaIdU);
    app.use('/api/users', router);
  };
