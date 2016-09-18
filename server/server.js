var loopback = require('loopback');
var boot = require('loopback-boot');

var http=require('http');
var https=require('https');
var sslConfig=require('./ssl-config.js');
var handle=require('./handle/routeHandle.js');
var bodyParser=require('body-parser');
var path=require('path');



// console.log('ksds')



var app = loopback();

// app.use(loopback.context());
// app.use(loopback.token({
//   model:app.models.acessToken,
//   currentUserLiteral:'me',
//   searchDefaultTokenKeys:false,
//   cookies:['access_token'],
//   headers:['access_token','X-Access-Token'],
//   params:['access_token']
// }))
// app.use(bodyParser.json({limit: '500mb'}));
// app.use(bodyParser.urlencoded({extended:true,limit:'500mb'}));
app.use(loopback.cookieParser('abc'));
app.use(loopback.context());
app.use(loopback.token({
  model: app.models.accessToken
}));
// app.use(function setCurrentUser(req,res,next){
//   if(!req.accessToken){
//     return next();
//   }

//   app.models.Yonghu.findById()
// })
app.use(function(req,res,next){
  var ctx=loopback.getCurrentContext();
  var token=ctx.get('accessToken');
  req.token=token;
  next();
});


boot(app,__dirname);

// app.use(bodyParser.json({limit: 524288000}));
// app.use(bodyParser.urlencoded({extended:true,limit:524288000}));



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
    var baseUrl=(1? 'http://':'https://')+app.get('host')+':'+app.get('port');
    app.emit('started',baseUrl);
    console.log('Loopback server listen at %s',baseUrl);
    if(app.get('loopback-component-explorer')){
       var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  // return server;
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
app.start(1);

var io=require('socket.io')(server)

// console.log(io);
io.on('connection',handle.socketConnection);

// module.exports=io;












