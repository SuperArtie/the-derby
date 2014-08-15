/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Mongo     = require('mongodb'),
    Gambler   = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'the-derby';

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new gambler object', function(){
      var g = new Gambler('Gary', {}, 'photo.jpg', 12, [], {});
      expect(g).to.be.instanceof(Gambler);
    });
  });

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });
  describe('#save', function(){
    it('should save a gambler', function(done){
      var g = {name: 'Al'},
          gam = new Gambler(g);
      gam.save(function(){
        expect(gam._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should find gambler by _id', function(done){
      Gambler.findById('000000000000000000000001', function(err, gambler){
        expect(gambler).to.respondTo('save');
        done();
      });
    });
  });
  describe('#removeAsset', function(){
    it('should remove an assett', function(done){
      Gambler.findById('000000000000000000000001', function(err, gambler){
        gambler.removeAsset('10K White Gold Wedding Ring');
        gambler.removeAsset('2010 Toyota Prius');
        gambler.removeAsset('Little Barney\'s Trust Fund');
        expect(gambler.assets.length).to.equal(0);
        console.log(gambler);
        done();
      });
    });
  });
});
