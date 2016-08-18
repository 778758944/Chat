/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-25 16:29:55
 * @version $Id$
 */
var loopback=require('loopback');
var formidable=require('formidable');
var Path=require('path');
var fs=require('fs');
var key=require('../key.js');
var sockets={},
	id;
var https=require('https');
var querystring=require('querystring');
var url=require('url');
var webPush=require('web-push');
webPush.setGCMAPIKey(key.pushkey);


var pushNotification=function(to){
	var pushkey=loopback.findModel('pushkey');
	pushkey.findById(to,function(err,data){
		if(err){
			console.log(err);
		}
		else{
			console.log(data.key);
			var subscribe=JSON.parse(data.key);
			var sendData=new Buffer('push text','utf-8');

			var params={
				payload:sendData,
				userPublicKey:subscribe.keys.p256dh,
				userAuth:subscribe.keys.auth
			}

			webPush.sendNotification(subscribe.endpoint,params);

			// var key_arr=data.key.split('/');
			// var register_id=key_arr.splice(key_arr.length-1,1)[0];
			// var request_url=key_arr.join('/');
			// // console.log('test',register_id,url);
			// var bodyData={
			// 	to:register_id,
			// 	data:{
			// 		name:'jack'
			// 	},
			// 	notification:{
			// 		body:'ssssss'
			// 	}
			// }

			// var urlData=url.parse(request_url);
			// console.log(urlData);

			// bodyData=querystring.stringify(bodyData);
			// var option={
			// 	hostname:urlData.hostname,
			// 	path:urlData.path,
			// 	method:"POST",
			// 	headers:{
			// 		'Content-Type':"application/x-www-form-urlencoded",
			// 		'Authorization':"key="+key.pushkey
			// 	}
			// };

			// var req=https.request(option,function(res){
			// 	console.log('status',res.statusCode);
			// 	var chunks=[];

			// 	res.on('data',function(chunk){
			// 		chunks.push(chunk);
			// 	});

			// 	res.on('end',function(){
			// 		var final_buf=Buffer.concat(chunks);
			// 		var dataStr=final_buf.toString('utf8');
			// 		console.log(dataStr);
			// 	});
			// })

			// req.write(bodyData);
			// req.end();
		}
	})
}

var socketConnection=function(socket){
	var userId;
	var points=loopback.findModel('points');
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
			// console.log('sendMsg',data);
			var to=data.to;
			var lx=data.lx ? data.lx:0;
			if(sockets[to]){
				points.findById(to,function(err,points){
					if(err){
						console.log(err);
						return;
					}
					else{
						// console.log(points);
						var path=points.point;
						// console.log(path);
						// console.log('/chat/'+userId);
						if(path=='/chat/'+userId){
							console.log('msg out');
							sockets[to].emit('news',{msg:data.msg,type:2,from:userId,lx:lx});
						}
						else{
							// console.log('no response');
							pushNotification(to);


							// console.log('i will give you a notice for a while');
						}
					}

				});

				// console.log('msg out');
				// sockets[to].emit('news',{msg:data.msg,type:2,from:userId,lx:lx});
			}
			else{
				pushNotification(to);
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

var updateInfo=function(req,res){
	var yonghu=loopback.findModel('yonghu');
	var ctx=loopback.getCurrentContext();
	var token=ctx.get('accessToken');
	console.log(token);
	var userId=token.userId;
	var form=formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		var username=fields.username;
		var img=files.tx;
		// console.log(img);
		var imgPath=img.path;
		var savePath=Path.resolve(__dirname,'../../client/userImg/'+userId+img.name);
		var filePath=Path.resolve("/userImg/"+userId+img.name);
		var read=fs.createReadStream(imgPath);
		var write=fs.createWriteStream(savePath);
		read.pipe(write);

		yonghu.updateAll({id:userId},{username:username,img:filePath},function(err,data){
			if(err){
				console.log(err);
			}
			else{
				console.log(data);
				res.json({code:200,msg:'success'});
			}
		})
	});

	// res.json({name:'jack'});
}


var uploadImg=function(req,res){
	var ctx=loopback.getCurrentContext();
	var userId=ctx.get('accessToken').userId;
	console.log(userId);
	var savePath=Path.resolve(__dirname,'../../client/userImg/'+userId+'.png');
	var filePath=Path.resolve("/userImg/"+userId+'.png');
	var data=new Buffer(req.body.data,'base64');
	fs.exists(savePath,function(exits){
		if(exits){
			fs.unlinkSync(savePath);
		}

		fs.writeFile(savePath,data,function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log('ok');
				res.json({path:filePath});
			}

		})
	})
}

var setPoint=function(req,res){
	// console.log('token',req.token);
	var points=loopback.findModel('points');
	var ctx=loopback.getCurrentContext();
	var userId=ctx.get('accessToken').userId;
	// console.log('point',req.body.point);
	var data={
		userId:userId,
		point:req.body.point
	}
	points.upsert(data,function(err,data){
		if(err){
			console.log(err);
			return err;
		}
		else{
			res.json({code:200,msg:'success'});
		}
	});
}

module.exports={
	login:login,
	socketConnection:socketConnection,
	updateInfo:updateInfo,
	uploadImg:uploadImg,
	setPoint:setPoint
}


















