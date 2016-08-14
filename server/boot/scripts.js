/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-02 21:20:37
 * @version $Id$
 */
module.exports=function(app){
	var mysqlDs=app.dataSources.mysqlDs;
	var user=app.models.yonghu;
	var accessToken=app.models.AccessToken;

	var data=[
		{
			email:'778758944@qq.com',
			password:"123456"
		},
		{
			emial:"123456@qq.com",
			password:'123456'
		}
	]

	user.create(data,function(err,data){
		if(err){
			console.log('err',err);
		}
		else{
			console.log('success',data);
		}
	})

	// // console.log(mysqlDs);

	 // mysqlDs.automigrate('yonghu',function(err){
		// user.create({
		//  	email:"123456@qq.com",
		//  	password:"123456"
		// },function(err,results){
		// 	console.log(results);
		//  })
	 // })

	 // console.log('boot script');

	 // mysqlDs.automigrate('AccessToken',function(err){
	 // 	if(err){
	 // 		console.log(err);
	 // 	}
	 // 	else{
	 // 		console.log('accessbuilt');
	 // 	}
	 // })

}
