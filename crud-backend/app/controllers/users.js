const mongoose = require('mongoose');
const User = require('../model/user');

exports.authCallback = function(req, res, next){
  res.redirect('/');
};

//login form
exports.login = function(req, res, next){
  User.findOne({$and:[
    {username: req.body.username},
    {password: req.body.password}
  ]}).exec(function(err, user){
    if(user){
      res.json({message: "User found"});
    }else{
      res.status(404).json({error:'User not found'})
    }
    next();
  });
};


//signup form
exports.signup = function(req, res){
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
};

//logout
exports.logout = function(req, res){
  req.signout();
  res.redirect('/');
};

//create users
exports.create = function(req, res){
  var user = new User(req.body);
  var message = null;

  user.save((err, user)=>{
    if(err){
      res.json(err);
    }
    else{
      res.json({message: 'user has been added successfully.'})
    }

  });
};


//get users
exports.allUsers = function(req, res, next){
  User.find(function(err, users){
    if(err){
      res.json(err);
    }else{
      res.json(users);
    }
  });
};

//find user by id
exports.userById = function(req, res, next, id){
  User.findOne({
    _id: id
  })
  .exec(function(err, user){
    if(err) return next(err);
    if(!user) return next(new Error('failed to load user'+ id));
    req.profile = user;
    next();
  });
};
