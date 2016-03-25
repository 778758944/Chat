/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-20 16:53:41
 * @version $Id$
 */
 module.exports=function(app){

 	var router=app.loopback.Router();
 	router.get('/api/test',function(req,res){
 		res.end('hello world');
 	});
 	app.use(router);
 }
