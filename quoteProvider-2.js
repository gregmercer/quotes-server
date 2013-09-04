var mongoose = require('mongoose');
var db_url = process.env.MONGOLAB_URI || "mongodb://localhost/quotes-server";
mongoose.connect(db_url);

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var quoteSchema = new Schema({
  author: { type: String }
, text: String
, year: Number
, hasCreditCookie: Boolean
});

mongoose.model('Quote', quoteSchema);
var Quote = mongoose.model('Quote');

QuoteProvider = function(){};

// Find all quotes
QuoteProvider.prototype.findAll = function(callback) {
  Quote.find({}, function (err, quotes) {
    callback( null, quotes );
  });  
};

// Create a new quote
QuoteProvider.prototype.save = function(params, callback) {
  var quote = new Quote({
    author: params['author'], 
    text: params['text'], 
    year: params['year'],
    hasCreditCookie: params['hasCreditCookie'],
  });
  quote.save(function (err) {
    callback();
  });
};

exports.QuoteProvider = QuoteProvider;