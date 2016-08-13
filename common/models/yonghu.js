var loopback=require('loopback');
var formidable=require('formidable');

module.exports = function(Yonghu) {
	Yonghu.friendList=function(cb){
		var ctx=loopback.getCurrentContext();
		var accessToken=ctx.get('accessToken');
		var userId=accessToken.userId;

		var selected={
			fields:{
				id:true,
				username:true,
				email:true,
				img:true
			},
			where:{
				// id:{
				// 	// regexp:'^(?!'+userId+'$)'
				// }
			}
		}

		Yonghu.find(selected,function(err,data){
			if(err){
				cb(err);
			}
			else{
				var myself;
				data.map(function(ele,index){
					if(ele.id==userId){
						myself=data.splice(index,1);
					}
				})
				var resData={
					myself:myself[0],
					friends:data
				};
				var resObj={
					code:200,
					data:resData,
					msg:'success'
				}
				cb(null,resObj);
			}
		})
	}

	Yonghu.remoteMethod('friendList',{
		returns:{root:true},
		http:{arg:'/friendlist',verb:"get"}
	})

	Yonghu.afterRemote('friendList',function(ctx,acc,next){
		// console.log(ctx.req.cookies);
		// console.log(ctx.req.accessToken);
		// acc.msgs='hahaha';
		// var res=ctx.res;
		// res.id=
		next();
	})


	Yonghu.afterRemote('login',function setLoginCookie(context,accessToken,next){
		// console.log(accessToken);
		var res=context.res;
		var req=context.req;
		if(accessToken !=null){
			if(accessToken.id){
				res.cookie('authorization',accessToken.id,{
					signed:true,
					maxAge:1000*accessToken.ttl
				});

				res.cookie('userId', accessToken.userId, {
				  signed: false,
				  maxAge: 1000 * accessToken.ttl
				});
			}
		}
		return next();
	});

	Yonghu.updateInfo=function(username,path,cb){
		console.log(path);
		var ctx=loopback.getCurrentContext();
		var userId=ctx.get('accessToken').userId;
		if(username&&path){
			Yonghu.updateAll({id:userId},{
				username:username,
				img:path
			},function(err,data){
				if(err){
					console.log(err);
				}
				else{
					console.log(data);
					cb(null,{code:200,msg:'success'});
				}

			})
		}
		else if(username){
			Yonghu.updateAll({id:userId},{
				username:username
			},function(err,data){
				if(err){
					console.log(err);
				}
				else{
					console.log(data);
					cb(null,{code:200,msg:'success'});
				}

			})
		}
		else if(path){
			Yonghu.updateAll({id:userId},{
				path:path
			},function(err,data){
				if(err){
					console.log(err);
				}
				else{
					console.log(data);
					cb(null,{code:200,msg:'success'});
				}

			})
		}
	}

	Yonghu.remoteMethod('updateInfo',{
		accepts:[
			{arg:'username',type:'string'},
			{arg:"path",type:"string"}
		],
		returns:{root:true},
		http:{arg:"/updateInfo",verb:'post'}
	});

	Yonghu.getImg=function(cb){
		var ctx=loopback.getCurrentContext();
		var userId=ctx.get('accessToken').userId;
		Yonghu.findById(userId,{img:true},function(err,data){
			if(err){
				console.log(err);
			}
			else{
				console.log(data);
				cb(null,{code:200,data:data.img,msg:'success'});
			}
		})
	}

	Yonghu.remoteMethod('getImg',{
		returns:{root:true},
		http:{arg:"/getImg",verb:"post"}
	})


};





















