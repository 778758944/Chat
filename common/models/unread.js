module.exports = function(Unread) {
	Unread.getUnreadMsg=function(from,req,cb){
		var userId=req.token.userId;
		console.log(req.token);
		Unread.find({where:{to:userId,from:from}},function(err,data){
			if(err){
				console.log(err);
			}
			else{
				Unread.remove({where:{to:userId,from:from}},function(err,data){
					if(err){
						console.log(err);
						return;
					}

					console.log(data);

				})
				var resData={
					code:200,
					data:data,
					msg:'success'
				}

				cb(null,resData);
			}
		})
	}

	Unread.remoteMethod('getUnreadMsg',{
		accepts:[
			{arg:"from",type:"number"},
			{arg:"req",type:"object",'http':{source:"req"}}
		],
		returns:{root:true},
		http:{arg:'/getUnreadMsg',verb:"post"}
	})
};

























