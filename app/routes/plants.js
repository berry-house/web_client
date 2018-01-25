var express = require('express');
var router = express.Router();

router.get('/plants/createPlant', function(req, res){
  res.render('createPlant',{
    pageTitle : "Create Plant"
  });
});

router.get('/plants/deletePlant', function(req, res){
  res.render('deletePlant',{
    pageTitle : "Delete Plant"
  });
});

router.get('/plants/editPlant', function(req, res){
  res.render('editPlant',{
    pageTitle : "Edit Plant"
  });
});


module.exports = router;
