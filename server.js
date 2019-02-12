const fallback = require('express-history-api-fallback');
const express = require('express');
const path = require('path');
const app = express();
// Run the app by serving the static files
// in the dist directory
const root = __dirname + '/dist/BlackList';
app.use(express.static(root));
//app.use(fallback('index.html', { root }))

// Start the app by listening on the default
// Heroku port
app.get('*', function(req, res) {
  res.sendfile('./dist/BlackList/index.html')
})
var port = process.env.PORT || 8080
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


// 'use strict';


// var path = require('path');
// var express = require('express');
// var bodyParser = require('body-parser');


// var app = express();

// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '/dist/BlackList')));


// app.use('*', function (req, res) {
//   return res.sendFile(path.join(__dirname, './dist/BlackList/index.html'));
// });


// if (module === require.main) {
//   var server = app.listen(process.env.port || 8080, function () {
//     var port = server.address().port;
//   });
// }

// module.exports = app;


