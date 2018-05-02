const mongoose = require('mongoose');
const config = require('../../config/config');
/**
 * deck Schema
 */
const deckschema = mongoose.Schema({
  created: {
      type: Date,
      default: Date.now
  },
  config: {
      type: String,
      default: '',
      trim: true
  },
  percentage: {
      type: String,
      default: '',
      trim: true
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  score: {
      type: Number,
      default:0
  }

});


/**
 * Validations
 */
deckschema.path('config').validate(function(config) {
    return config.length;
}, 'config cannot be blank');

/**
 * Statics
 */
deckschema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

const DealerDecks = module.exports = mongoose.model('Dealer', deckschema);
