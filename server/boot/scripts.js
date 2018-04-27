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
	var points=app.models.points;

	var data=[
		{
			email:"123456@test.com",
			password:'123456'
		}, {
      email:"778758944@qq.com",
      password: '123321q'
    }
	];
  /*


	mysqlDs.automigrate('unread',function(err){
		if(err){
			console.log('err');
		}
		else{
			console.log('success');
		}
	})



	mysqlDs.automigrate('pushkey',function(err){
		if(err){
			console.log('err');
		}
		else{
			console.log('success');
		}
	})


	mysqlDs.automigrate('points',function(err){
		if(err){
			console.log('err');
		}
		else{
			console.log('success');
		}
	})

	user.create(data,function(err,data){
		if(err){
			console.log('err',err);
		}
		else{
			console.log('success',data);
		}
	})

	// // console.log(mysqlDs);

	 mysqlDs.automigrate('yonghu',function(err){
		user.create(data,function(err,results){
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
		 })
	 })

	 // console.log('boot script');

	 mysqlDs.automigrate('AccessToken',function(err){
	 	if(err){
	 		console.log(err);
	 	}
	 	else{
	 		console.log('accessbuilt');
	 	}
	 })
   */

}
