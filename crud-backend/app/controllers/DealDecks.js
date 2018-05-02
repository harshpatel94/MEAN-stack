const DealDecks = require('../model/DealDecks');
const mongoose = require('mongoose');
var _ = require('underscore');

//find dealdecks by id
exports.dealDecks = function(req, res, next, id){
  DealDecks.load(id, function(err, DealDecks){
    if(err) return next(err);
    if(!DealDecks) return next(new Error('Failed to load Decks '+ id));
    req.DealDecks = DealDecks;
    next();
  });
};

exports.insert = function(req, res){
  let dealDecks = new DealDecks({
    config: req.body.config,
    percentage: req.body.percentage,
    user: req.body.user
  });

  dealDecks.save((err, decks)=>{
    if(err){
      res.json(err);
    }else{
      res.json({msg: 'decks added successfully'})
    }
  });
};

//update decks
exports.update = function(req, res){
  const dealDecks = req.DealDecks;
  dealDecks = _.extend(dealDecks, req.body);
  dealDecks.save(function(err){
    res.jsonp(dealDecks);
  });
};


//delete decks
exports.delete = function(req, res){
  var dealDecks = req.DealDecks;

  dealDecks.remove(function(err){
    if(err){
      res.render('error', {
        status: 500
      });
    }else{
      res.jsonp(dealdecks);
    }
  });
};


//show all decks
exports.display = function(req, res){
  res.jsonp(req.DealDecks);
};


//list of decks
exports.allDecks = function(req, res){
  DealDecks.find().sort('-created').populate('user','name username').exec(function(err, dealDecks){
    if(err){
      res.render('error', {
        status: 500
      });
    }else{
      res.jsonp(dealDecks);
    }
  });
};

exports.decksById = function(req, res, next, id){
  User.findOne({
    _id: id
  })
  .exec(function(err, decks){
    if(err) return next(err);
    if(!decks) return next(new Error('Decks not found for'+ id));
    req.profile = decks;
    next();
  });
};
