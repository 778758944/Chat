/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-25 16:29:55
 * @version $Id$
 */
var socketHandle=function(socket){
	var room='friends';
	socket.join(room,function(){
		console.log(socket.rooms);
	});
	socket.emit('news',{msg:'hello world'});
	socket.on('sendMsg',function(msg){
		console.log(msg);
		msg.type=2;
		socket.to('friends').emit('news',msg);
		
	})
}

module.exports=socketHandle;