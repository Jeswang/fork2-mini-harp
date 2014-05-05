#!/usr/bin/env node

argv = require("minimist")(process.argv.slice(2));

var port = 4000;
if(argv.port!=undefined){
  port = argv.port;
}

var root = process.cwd(); // current directory
if(argv._.length>0){
  var fs = require("fs");
  var test = argv._[0];

  var stat = fs.existsSync(test);
  if(stat==true){
    root = test;
  }
  else{
    console.log(test + " is not a directory");
  }
}

var createMiniHarp = require("mini-harp");
var app = createMiniHarp(root);
app.listen(port);
