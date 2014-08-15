'use strict';
var _     = require('lodash'),
    Mongo = require('mongodb');

/****************
 * CONSTRUCTOR  *
 ****************/
function Gambler(o){
  this.name       = o.name;
  this.spouse     = o.spouse;
  this.photo      = o.photo;
  this.cash       = parseFloat(o.cash);
  this.assets     = o.assets;
  this.results    = o.results;
  //this.isDivorced = o.isDivorced;
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

/****************
 * FIND BY ID   *
 ****************/
Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err, obj){
    var gambler = changePrototype(obj);
    //console.log(gambler);
    cb(null, gambler);
  });
};

/******************
 * ADD ASSET      *
 ******************/
Gambler.prototype.addAsset = function(asset){
  this.assets.push(asset);
};

/*******************
 * REMOVE ASSET    *
 *******************/
Gambler.prototype.removeAsset = function(name){
  //if(!this.assets.length){return 0;}
  var value = _.remove(this.assets, function(v){
        return v.name === name;
      }),
      newArray = _.remove(this.assets, function(n){
        return n !== name;
      });
  this.cash += value[0].value;
  this.assets = newArray;
  if(this.assets.length === 0){
    this.isDivorced = true;
  }
  //console.log('MODEL:' + value);
  //console.log('MODEL:' + newArray);
};

/******************
 * SAVE           *
 ******************/
Gambler.prototype.save = function(cb){
  Gambler.collection.save(this, cb);
};

/****************
 * FIND ALL     *
 ****************/
Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

module.exports = Gambler;

/*********************
 * CHANGE PROTOTYPES *
 *********************/
function changePrototype(obj){
  var gambler = _.create(Gambler.prototype, obj);
  return gambler;
}
