
function createMiniHarp(){
  var connect = require('connect');
  var app = connect().use(
      function(req, res){
        if(req.url == '/current-time'){
          res.end((new Date()).toISOString());
        }
        else{
          res.end('Cannot Get '+req.url);
        }
      });
  return app;
}

module.exports = createMiniHarp;
