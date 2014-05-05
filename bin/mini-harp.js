#!/usr/bin/env node

argv = require("minimist")(process.argv.slice(2));

var port = 4000;
if(argv.port!=undefined){
  port = argv.port;
}

var createMiniHarp = require("mini-harp");
var app = createMiniHarp();
app.listen(port);
