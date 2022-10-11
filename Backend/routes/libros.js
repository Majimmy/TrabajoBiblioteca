/* poner en backend/routes. */
var express = require('express');
var router = express.Router();
var codLibro = 1;

router.get('/', function(req, res, _) {
    res.json({libros:codLibro})
});
router.put('/',function(req,res,_){
    codLibro=req.body.libros
    res.status(200).json({message: 'OK'})
});
router.post('/', function(req, res, _) {
    let genero = req.body.genero
    let codGenero = 0
    if (genero == 'novela'){
      codGenero = 1
    }else{
      codGenero = 0
    }
    res.status(200).json({codGenero: codGenero})
  });
module.exports = router;
