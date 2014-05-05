
function createMiniHarp(root){
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var app = connect()
    .use(serveStatic(root));
  return app;
}

module.exports = createMiniHarp;
