# dictionary
simple attribute library

Setup for Windows
<ul>
  <li>Make sure your user account has administrator access</li>
  <li>Install MongoDB</li>
  <li>Install Node.js</li>
  <li>Make sure node/npm has been added to your system path</li>
  <li>In command prompt run command "npm install -g express" and "npm install -g mongoose" (-g flag installs these important libraries globally on your system)</li>
  <li>In command prompt run command "mkdir C:\data\db" (data directory for MongoDB, MongoDB will not run without it)</li>
</ul>

Deploy
<ul>
  <li>In command prompt run "mongod" (MongoDB Server), if "mongod" not in system path navigate to install directory to run and make sure "C:\data\db" exists<li>
  <li>Git pull the master branch of this repo to some easy to access directory, please do not overwrite any of the master files. Perhaps make a personal branch?</li>
  <li>In command prompt navigate to the new git pull location's top most directory, this directory should have a package.json file in it</li>
  <li>In command prompt run command "npm install" (this installs any local library dependencies, specified in package.json, express and mongoose will be redundantly installed locally but don't worry about it)</li>
  <li>In command prompt run command "node server.js" to start and deploy your express application server</li>
</ul>

Use
<ul>
  <li>In a web broswer navigate to http://localhost/atrb.html to view the web application</li>
  <li>Since there is no data in the database yet you will see nothing but you may be able to insert data, give it a try</li>
  <li>In a web broswer navigate to http://localhost/api/atrb to view the raw GET data</li>
</ul>

This is a basic setup and run from my memory so it may be incomplete/incorrect. We didn't setup any data in the DB but you may be able to insert data. Setting up test data is something I will type about another day but its simple enough. As for the actually working bits I can elaborate on that in the future.
