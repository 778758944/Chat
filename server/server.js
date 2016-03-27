var loopback = require('loopback');
var boot = require('loopback-boot');

var http=require('http');
var https=require('https');
var sslConfig=require('./ssl-config.js');



var app = module.exports = loopback();
var socketHandle=require('./handle/socketHandle');
boot(app,__dirname);



app.start = function(httpOnly) {
  // start the web server
  //hhh
  if(!httpOnly){
    var options={
      key:sslConfig.privateKey,
      cert:sslConfig.certificate,
    };
    server=https.createServer(options,app);
  }
  else{
    server=http.createServer(app);
  }

  server.listen(app.get('port'),function(){
    var baseUrl=(httpOnly? 'http://':'https://')+app.get('host')+':'+app.get('port');
    app.emit('started',baseUrl);
    console.log('Loopback server listen at %s',baseUrl);
    if(app.get('loopback-component-explorer')){
       var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
  // return app.listen(function() {
  //   app.emit('started');
  //   var baseUrl = app.get('url').replace(/\/$/, '');
  //   console.log('Web server listening at: %s', baseUrl);
  //   if (app.get('loopback-component-explorer')) {
  //     var explorerPath = app.get('loopback-component-explorer').mountPath;
  //     console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
  //   }
  // });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.


  // start the server if `$ node server.js`
    var server=app.start(1);
    var io=require('socket.io')(server);
    io.on('connection',socketHandle);













