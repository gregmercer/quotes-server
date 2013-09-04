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

// Find quote by ID
QuoteProvider.prototype.findById = function(id, callback) {
  Quote.findById(id, function (err, quote) {
    if (!err) {
      console.log(quote);  
      callback(null, quote);
    }
  });
};

// Update quote by ID
QuoteProvider.prototype.updateById = function(id, body, callback) {
  Quote.findById(id, function (err, quote) {
    if (!err) {
      quote.author = body.author;
      quote.text = body.text;
      quote.year = body.year;
      quote.hasCreditCookie = body.hasCreditCookie;
      quote.save(function (err) {
        callback();
      });
    }
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

// Delete quote by ID
QuoteProvider.prototype.deleteById = function(id, callback) {
  Quote.findById(id, function (err, quote) {
    if (!err) {
      quote.remove(function (err) {
        callback();
      });
    }
  });
};

exports.QuoteProvider = QuoteProvider;