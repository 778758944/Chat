var loopback=require('loopback');

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
				data.map(function(ele,index){
					if(ele.id==userId){
						data.splice(index,1);
					}
				})
				var resObj={
					code:200,
					data:data,
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
	})


};





















