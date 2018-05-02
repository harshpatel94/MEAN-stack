const mongoose = require('mongoose');
/**
 * User schema
 */
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
   type: String,
   required: true
 }

});

 /**
  * Encryption, validations and virtuals
  */

UserSchema.virtual('pass').set(function(pass){
  this._pass = pass;
}).get(function(){
  return this._pass;
});

const validate = function(value){
  return value && value.length;
};

UserSchema.pre('save', function(next){
  if(this.isNew) return next();

  if(!validate(this.pass)){
    next(new Error('Invalid Password'));
  }else{
    next();
  }
});

const User = module.exports = mongoose.model('User', UserSchema);
