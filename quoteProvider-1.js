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

exports.QuoteProvider = QuoteProvider;