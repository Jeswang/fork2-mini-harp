
function createMiniHarp(root){
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var jadeMiddleware = require('./lib/processor/jade');
  var lessMiddleware = require('./lib/processor/less');
  var app = connect()
    .use(function (req, res, next){
      //console.log("visiting" + req.url);
      if(req.url == '/'){
        req.url = '/index.html';
      }
      return next();
    })
    .use(jadeMiddleware(root))
    .use(lessMiddleware(root))
    .use(serveStatic(root));
  return app;
}

module.exports = createMiniHarp;
