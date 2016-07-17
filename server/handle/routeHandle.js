/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-25 16:29:55
 * @version $Id$
 */
var loopback=require('loopback');
var sockets={},
	id;

var socketConnection=function(socket){
	var userId;
	if(socket.request.headers.cookie){
		var cookies=socket.request.headers.cookie.split(';');
		console.log(cookies);
		cookies.map(function(ele,index){
			// console.log(ele.indexOf('userId'));
			if(ele.indexOf('userId')==1){
				userId=ele.split('=')[1];
			}
		})

		console.log('userid',userId);



		sockets[userId]=socket;
		socket.on('sendMsg',function(data){
			console.log('sendMsg',data);
			var to=data.to;
			var lx=data.lx ? data.lx:0;
			if(sockets[to]){
				console.log('msg out');
				sockets[to].emit('news',{msg:data.msg,type:2,from:userId,lx:lx});
			}
		})
	}

}





var login=function(req,res){
	var yonghu=loopback.findModel('yonghu');
	yonghu.login(req.body,function(err,results){
		if(err){
			console.log(err);
			return;
		}
		id=results.userId;
		res.json(results);
	})
}

module.exports={
	login:login,
	socketConnection:socketConnection
}


















