'use strict';

var Gambler = require('../models/gambler');

exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.init = function(req, res){
  res.render('gamblers/init');
};

exports.create = function(req, res){
  var o       = {name:req.body.name, spouse:{name:req.body.spouseName, photo:req.body.spousePhoto}, photo:req.body.photo, cash:req.body.cash, assets:[], results:{}},
      gambler = new Gambler(o);
  gambler.save(function(){
    console.log(gambler);
    res.redirect('/');
  });
};

exports.show = function(req, res){
  Gambler.findById(req.params.id, function(err, gambler){
    console.log(gambler);
    res.render('gamblers/show', {gambler:gambler});
  });
};

exports.initAsset = function(req, res){
  Gambler.findById(req.params.id, function(err, gambler){
    res.render('gamblers/newAsset', {gambler:gambler});
  });
};

exports.newAsset = function(req, res){
  Gambler.findById(req.params.id, function(err, gambler){
    var value = parseFloat(req.body.value);
    gambler.addAsset({name:req.body.name, photo:req.body.photo, value:value});
    gambler.save(function(){
      res.redirect('/gamblers/'+req.params.id);
    });
  });
};

exports.destroy = function(req, res){
  Gambler.findById(req.params.id, function(err, gambler){
    gambler.removeAsset(req.params.name);
    gambler.save(function(){
      res.send({id:req.params.id, name:req.params.name, isDivorced:gambler.isDivorced, cash:gambler.cash});
    });
  });
};
