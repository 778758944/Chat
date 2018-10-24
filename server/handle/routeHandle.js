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


function getUtcTime() {
	var d1 = new Date();
	var d2 = new Date( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
	return (d2.getTime()/1000)-(3600 * 8);
}


var pushNotification=function(to,from,msg,lx){
	console.log('lx',lx);
	var unread=loopback.findModel('unread');
	var pushkey=loopback.findModel('pushkey');
	var yonghu=loopback.findModel('yonghu');

	if(lx==0){
		var unreadData={
			type:2,
			to:to,
			from:from,
			msg:msg,
			lx:lx,
			createAt: getUtcTime()
		}

		unread.create(unreadData,function(err){
			if(err){
				console.log(err);
			}
		})
	}
	else if(lx=='img'){
		var imgName=new Date().getTime().toString()+to+from+'.jpg';
		var img_path=Path.resolve(__dirname,'../../client/media/'+imgName);
		var base64_data=msg.substr(22);
		var data=new Buffer(base64_data,'base64');
		fs.exists(img_path,function(exists){
			if(!exists){
				fs.writeFile(img_path,data,function(err){
					if(err){
						console.log(err);
						return;
					}
					else{
						var web_img_path='https://'+location.host+'/media/'+imgName;
						var unreadData={
							type:2,
							to:to,
							from:from,
							msg:web_img_path,
							lx:lx,
							createAt: getUtcTime()
						}
						unread.create(unreadData,function(err,data){
							if(err){
								console.log(err);
							}
							else{
								console.log(data);
							}
						})
					}
				})
			}
		})
	}
	else if(lx=='wav'){
		console.log(msg instanceof Buffer);
		var wavName=new Date().getTime().toString()+to+from+'.wav';
		var wav_path=Path.resolve(__dirname,'../../client/media/',wavName);
		console.log(wav_path);
		fs.exists(wav_path,function(exists){
			if(!exists){
				fs.writeFile(wav_path,msg,function(err,data){
					if(err){
						console.log(err);
						return;
					}
					var unreadData={
						type:2,
						to:to,
						from:from,
						msg:'https://'+location.host+'/media/'+wavName,
						lx:lx,
						createAt: getUtcTime()
					}

					unread.create(unreadData,function(err){
						if(err){
							console.log(err);
						}
					})
				})
			}
		})
	}

	// var unreadData={
	// 	type:2,
	// 	to:to,
	// 	from:from,
	// 	msg:msg,
	// 	lx:lx
	// }

	// var p3=new Promise(function(resolve,reject){
	// 	if(lx==0){
	// 		unread.create(unreadData,function(err,data){
	// 			if(err){
	// 				console.log(err);
	// 				reject(err);
	// 			}
	// 			else{
	// 				resolve(data);
	// 			}
	// 		})
	// 	}
	// })

	var p1=new Promise(function(resolve,reject){
		console.log("pushkey", to);
		pushkey.findById(to,function(err,data){
			if(err){
				console.log(err);
				reject(err)
			}
			else{
				resolve(data);
			}
		})
	});

	var p2=new Promise(function(resolve,reject){
		console.log("yonghu", from);
		yonghu.findById(from,{fields:{
			username:true,
			email:true,
			img:true
		}},function(err,data){
			if(err){
				console.log(err);
				reject(err)
			}
			else{
				resolve(data);
			}
		})
	});

	Promise.all([p1,p2]).then(function(res){
		// console.log('promise',res);
		var pushData=res[0];
		var userData=res[1];

    console.log('pushData', pushData);
		console.log('userData', userData);

			// console.log('data',rp.pushkeys);
		var title=userData.username || userData.email;
		var body=msg;
		var img=userData.img;
		// console.log(title,body,img);
		// console.log();
		var subscribe=JSON.parse(pushData.key);

		if(lx==0){
			var sendData={
				title:title+'发来一条消息',
				body:msg,
				icon:img,
				tag:title,
				data:{
					url:'https://chat.xingwentao.xyz/build/index.html'
				}
			}
		}
		else if(lx=='img'){
			var sendData={
				title:title+'发来一条消息',
				body:'发来一张图片',
				icon:img,
				tag:title,
				data:{
					url:'https://chat.xingwentao.xyz/build/index.html'
				}
			}
		}
		else if(lx=='wav'){
			var sendData={
				title:title+'发来一条消息',
				body:'发来一段语音',
				icon:img,
				tag:title,
				data:{
					url:'https://chat.xingwentao.xyz/build/index.html'
				}
			}
		}


		sendData=JSON.stringify(sendData);

		var params={
			payload:sendData,
			userPublicKey:subscribe.keys.p256dh,
			userAuth:subscribe.keys.auth
		}

		webPush.sendNotification(subscribe.endpoint,params);

	})
}

var socketConnection=function(socket){
	console.log("websocket connected");
	var userId;
	var points=loopback.findModel('points');
	console.log("socket cookie", socket.request.headers.cookie);
	if(socket.request.headers.cookie){
		var cookies=socket.request.headers.cookie.split(';');
		console.log(cookies);
		cookies.map(function(ele,index){
			console.log(ele.indexOf('userId'));
			if(ele.indexOf('userId')!=-1){
				console.log("find userId");
				userId=ele.split('=')[1];
			}
		})

		console.log('userid in socket connection',userId);



		sockets[userId]=socket;
		socket.on('sendMsg',function(data){
			console.log('sendMsg',data);
			socket.emit("msgRes", data);
			var to=data.to;
			var lx=data.lx ? data.lx:0;
		//	console.log("emit socket", sockets[to]);
			console.log("emit userid", userId);
			if(sockets[to]){
				points.findById(to,function(err,points){
					if(err){
						console.log(err);
						return;
					}
					else{
						// console.log(points);
						var path=points.point;
						console.log(path);
						console.log('/chat/'+userId);
						if(path=='/chat/'+userId){
							console.log('msg out');
							console.log("to:", to);
							console.log("sockets key:", Object.keys(sockets));
							console.log(getUtcTime());
							sockets[to].emit('news',{msg:data.msg,type:2,from:userId,lx:lx, createAt: getUtcTime(), to: to});
						}
						else{
							if(true ||path=='/friend' || path=='/'){
								console.log('counter');
								sockets[to].emit('addCounter', {msg:data.msg,type:2,from:userId,lx:lx, createAt: getUtcTime(), to: to});
							}
							// console.log('no response');
							pushNotification(to,userId,data.msg,lx);


							// console.log('i will give you a notice for a while');
						}
					}

				});

				// console.log('msg out');
				// sockets[to].emit('news',{msg:data.msg,type:2,from:userId,lx:lx});
			}
			else{
				console.log("just push notification");
				pushNotification(to,userId,data.msg,lx);
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
	console.log("upload image");
	var ctx=loopback.getCurrentContext();
	var userId=ctx.get('accessToken').userId;
	console.log("upload image userid:", userId);
	var timestamp=new Date().getTime();
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if (err) {
			console.log(err);
			return err;
		}
		var file = files.data;
		var tmpPath = file.path + "/" + file.name;
		console.log("tmpPath", tmpPath);
		var fileExt = file.name.substring(file.name.indexOf('.'));
		var savePath=Path.resolve(__dirname,'../../client/userImg/'+userId+timestamp+fileExt);
		var filePath=Path.resolve("/userImg/"+userId+timestamp+fileExt);
		var readStream = fs.createReadStream(file.path);
		var writeStream = fs.createWriteStream(savePath);
		readStream.pipe(writeStream);
		res.json({path:filePath});

		
	});

/*
	var data=new Buffer(req.body.data,'base64');
	fs.writeFile(savePath,data,function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('ok');
			res.json({path:filePath});
		}

	});
	*/


}

var setPoint=function(req,res){
	console.log('setPonit token',req.token);
	var points=loopback.findModel('points');
	var ctx=loopback.getCurrentContext();
	var userId=ctx.get('accessToken').userId;
	console.log("setPoint userId:", userId);
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


















