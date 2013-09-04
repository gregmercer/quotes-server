var express = require('express');
var app = module.exports = express.createServer();

var port = process.env.PORT || 3000;

// Configuration
var pub = __dirname + '/public';

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(pub));  
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Get the QuoteProvider

var QuoteProvider = require('./quoteProvider').QuoteProvider;
var QuoteProvider = new QuoteProvider();

// Routing paths

// add headers for allowing cross server

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
});

// say hello

app.get('/', function(req, res){
  res.send('Hello World from Quotes Server - post to /quotes to create');
});

// get - list all the quotes 

app.get('/quotes', function(req, res) { 
  QuoteProvider.findAll(function(error, quotes) {
    console.log('back from findAll');
    console.log(quotes);
    res.send(quotes);
  });
});

// post - create a new quote

app.post('/quotes', function(req, res) {
  QuoteProvider.save({
    author: req.param('author'),
    text: req.param('text'),
    year: req.param('year'),
    hasCreditCookie: req.param('hasCreditCookie')  
  }, function(error, docs) {
    res.send(req.body);
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  
  app.listen(port);
  console.log("Express server listening on port %d", port);

}

