module.exports = makeLess;

var send = require('send');

function makeLess(root) {
  return function JadeMiddleware(req, res, next){
    var less = require('less');
    var path = require('path');
    var fs = require('fs');
    var url = require('url');

    var extname = path.extname(req.url);
    var realPath = root + url.parse(req.url).pathname;
    if(extname == ".less"){
      //访问了不该访问的文件 
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end("Error");
    }
    else if(extname == '.css'){
      if(path.existsSync(realPath)){
        //存在 css 文件
        return next();
      }
      else{
        var reg = new RegExp("css$"); //创建正则RegExp对象
        var lessFile = realPath.replace(reg,"less");
        if(path.existsSync(lessFile)){
          //存在 less 文件
          fs.readFile(lessFile,{encoding: "utf8"},function (err, data) {
            var options = {};
            less.render(data, options, function (e, css) {
              if (e) throw e;
              res.setHeader('Content-Length', css.length);
              res.setHeader('Content-Type', 'text/css; charset=UTF-8');
              res.end(css);
            });
          })
        }
        else{
          //不存在 css 文件
          return next();
        }
      }
    }
    else
      return next();
  };
}

