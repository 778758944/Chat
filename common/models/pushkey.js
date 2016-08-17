var loopback=require('loopback');

module.exports = function(Pushkey) {
	Pushkey.addkey=function(req,key,cb){
		// console.log('key',key);
		// console.log(key.req);
		// console.log(typeof key);
		// console.log(key.key);

		console.log('token',req.token);
		console.log('key',key);

		var userId=req.token.userId;

		if(!userId){
			var resData={
				code:200,
				data:'when you log in,we will set your key',
				msg:"success"
			}
			cb(null,resData);
			return;
		}



		var data={
			userId:userId,
			key:key
		}
		Pushkey.upsert(data,function(err,data){
			if(err){
				console.log(err);
			}
			else{
				var resData={
					code:200,
					data:data,
					msg:'success'
				}
				cb(null,resData);	
			}
		})
	}



	Pushkey.remoteMethod('addkey',{
		accepts:[
			{arg:"req",type:"object",'http':{source:'req'}},
			{arg:"key",type:"string"}
		],
		returns:{root:true},
		http:{arg:'/addkey',verb:'post'}
	});



};



























