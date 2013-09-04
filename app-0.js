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

// Routing paths

app.get('/', function(req, res){
	res.send('Hello World from Quotes Server');
});

// Only listen on $ node app.js

if (!module.parent) {
  
  app.listen(port);
  console.log("Express server listening on port %d", port);

}

