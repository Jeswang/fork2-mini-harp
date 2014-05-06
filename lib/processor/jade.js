module.exports = makeJade;

var send = require('send');

function makeJade(root) {

  return function JadeMiddleware(req, res, next){
    var jade = require('jade');
    var path = require('path');
    var fs = require('fs');
    var url = require('url');

    var extname = path.extname(req.url);
    var realPath = root + url.parse(req.url).pathname;
    //console.log("Hello jade middle ware");
    //console.log("visiting file " + realPath);
    //console.log(extname);
    if(extname == ".jade"){
      //console.log("访问了不该访问的文件");
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end("Error");
    }
    else if(extname == '.html'){
      if(path.existsSync(realPath)){
        //console.log("存在 html 文件");
        return next();
      }else{
        //console.log("不存在 html 文件");
        var reg = new RegExp("html$"); //创建正则RegExp对象
        var jadeFile = realPath.replace(reg,"jade");
        if(path.existsSync(jadeFile)){
          //存在 jade 文件
          fs.readFile(jadeFile,{encoding: "utf8"},function (err, data) {
            var options = {};
            jade.render(data, options, function (err, html) {
              if (err) throw err;
              //console.log(html);
              res.setHeader('Content-Length', html.length);
              res.setHeader('Content-Type', 'text/html; charset=UTF-8');
              res.end(html);

            });
          })
        }
        else{
          //不存在 jade 文件
          return next();
        }
      }
    }
    else
      return next();
  };
}
