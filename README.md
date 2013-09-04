quotes-server
==================

#### HowTo for creating/deploying a Quotes server (nodejs/express/mongoose) on Heroku.

This is a companion server for the jsframework-talk discussed at:
https://github.com/gregmercer/jsframework-talks

Create a folder for the Quotes server
```
mkdir quotes-server
cd quotes-server/
mkdir node_modules
sudo npm install express
sudo npm install mongoose
```

Create the package.json file
```
npm view express version
npm view mongoose version
create/edit package.json
be sure to add/change the versions used in package.json to match what you have installed
```

Create the quotes-server Heroku app
```
gregs-mac:quotes-server$ heroku create --app quotes-server
Creating quotes-server... done, stack is cedar
http://quotes-server.herokuapp.com/ | git@heroku.com:quotes-server.git
```

Add a mongo database
```
gregs-mac:quotes-server$ heroku addons:add mongolab --app quotes-server
Adding mongolab on quotes-server... done, v3 (free)
Welcome to MongoLab.  Your new subscription is ready for use.  Please consult the MongoLab Add-on Admin UI for more information and useful management tools.
Use `heroku addons:docs mongolab` to view documentation.
```

Initialize git for the Quotes server app
```
gregs-mac:quotes-server$ git init
Initialized empty Git repository in /Users/macgmercer/Desktop/greg/dev/javascript/jsframework-talks/heroku/quotes-server/.git/
gregs-mac:quotes-server$ git remote add heroku git@heroku.com:quotes-server.git
gregs-mac:quotes-server$ git add .
gregs-mac:quotes-server$ git commit -m 'test'
[master (root-commit) 94ea2e9] test
 599 files changed, 91241 insertions(+)
gregs-mac:quotes-server$ git push heroku master
```

Create/Edit the initial version the app
```
create/edit app.js (copy app-0.js over app.js)
create/edit quoteProvider.js (copy quoteProvider-0.js over quoteProvider.js)
```

Push the new app file up to Heroku
```
gregs-mac:quotes-server$ git add .
gregs-mac:quotes-server$ git commit -m 'test'
gregs-mac:quotes-server$ git push heroku master

you should see messages like this near the end of the git push:

-----> Building runtime environment
-----> Discovering process types
       Procfile declares types -> web

-----> Compiled slug size: 6.3MB
-----> Launching... done, v9
       http://quotes-server.herokuapp.com deployed to Heroku

you can check the app's log with the following command:
gregs-mac:quotes-server$ heroku logs       

side note -- 
you can go to this location to get the latest status for Heroku:
https://status.heroku.com/
```

Test the new server hosted on Heroku
```
browse to the following location:
http://quotes-server.herokuapp.com/
```

Create/Edit the next version the app, and the data provider
```
edit app.js (copy app-1.js over app.js)
edit quoteProvider.js (copy quoteProvider-1.js over quoteProvider.js)
```

Push the update and new file up to Heroku
```
gregs-mac:quotes-server$ git add .
gregs-mac:quotes-server$ git commit -m 'test'
gregs-mac:quotes-server$ git push heroku master
```

Test the quote server 
```
browse to the following location:
http://quotes-server.herokuapp.com/
if everything went well, the main page should now read:
'Hello World from Quotes Server with data provider'
```

Edit the next version the app, and the data provider.
We'll be adding code for creating a quote.
```
edit app.js (copy app-2.js over app.js)
edit quoteProvider.js (copy quoteProvider-2.js over quoteProvider.js)
```

Push the update and new file up to Heroku
```
gregs-mac:quotes-server$ git add .
gregs-mac:quotes-server$ git commit -m 'test'
gregs-mac:quotes-server$ git push heroku master
```

Test the quote server 
```
browse to the following location:
http://quotes-server.herokuapp.com/
if everything went well, the main page should now read:
'Hello World from Quotes Server - post to /quotes to create'
```

Now let's test creating a quote
```
run chrome extension 'Dev Http Client'
Change request select to: 'HTTP'
Change location to: 'quotes-server.herokuapp.com/quotes'
Change method to: 'POST'
Add headers: 'Content-Type' : 'application/json' with body:
{ "author" : "GBear", "text" : "Node node node", "year": 2013, "hasCreditCookie": true }
click send… should see 200 OK
check if the new quote was added
http://quotes-server.herokuapp.com/quotes
add a couple more quotes and check that all of the list now
```

Edit the next version the app, and the data provider.
We'll be adding code for get and update a quote by id.
```
edit app.js (copy app-3.js over app.js)
edit quoteProvider.js (copy quoteProvider-3.js over quoteProvider.js)
```

Push the update and new file up to Heroku
```
gregs-mac:quotes-server$ git add .
gregs-mac:quotes-server$ git commit -m 'test'
gregs-mac:quotes-server$ git push heroku master
```

Test the quote server 
```
browse to the following location:
http://quotes-server.herokuapp.com/
if everything went well, the main page should now read:
'Hello World from Quotes Server - get/put to /quotes/:id to get/update by id'
```

Test the new feature - get quote by id
```
next - browse to the following location:
http://quotes-server.herokuapp.com/quotes
note down one of the ids
then add the id onto the end of the url like this (your id with be different):
http://quotes-server.herokuapp.com/quotes/5227849da2166e0200000001
if all went will, you should now just see the one quote listed
```

Test the other new feature - update quote by id
```
run chrome extension 'Dev Http Client'
Change request select to: 'HTTP'
Change location to: 'quotes-server.herokuapp.com/quotes/5227849da2166e0200000001'
use the id you used in the last get by id test, my id will be different than yours
Change method to: 'PUT'
Add headers: 'Content-Type' : 'application/json' with body:
{ "author" : "Willy Wonka", "text" : "Candy candy candy", "year": 2013, "hasCreditCookie": true }
click send… should see 200 OK
check if the new quote was updated
http://quotes-server.herokuapp.com/quotes
```

Edit the next version the app, and the data provider.
We'll be adding code for delete a quote by id.
```
edit app.js (copy app-4.js over app.js)
edit quoteProvider.js (copy quoteProvider-4.js over quoteProvider.js)
```

Push the update and new file up to Heroku
```
gregs-mac:quotes-server$ git add .
gregs-mac:quotes-server$ git commit -m 'test'
gregs-mac:quotes-server$ git push heroku master
```

Test the new feature - delete quote by id
```
run chrome extension 'Dev Http Client'
Change request select to: 'HTTP'
Change location to: 'quotes-server.herokuapp.com/quotes/5227849da2166e0200000001'
use the id you used in the last get by id test, my id will be different than yours
Change method to: 'DELETE'
click send… should see 200 OK
check if the quote was delete
http://quotes-server.herokuapp.com/quotes
```



