/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-04 11:35:25
 * @version $Id$
 */

// var io=require('../server');
// var io=require('socket.io');
var handle=require('../handle/routeHandle');
var path=require('path');
module.exports=function(app){
	var yonghu=app.models.yonghu;
	var router = app.loopback.Router();

	// app.get('*',function(request,response){
	//   response.sendFile(path.resolve(__dirname,'../../client/build/index.html'));
	// })

	router.get('/test',function(req,res){
		res.json({name:"jack"});
	})

	router.post('/api/Yonghu/login',handle.login);
	router.post('/api/uploadImg',handle.uploadImg);
	
	app.use(router);
}
