/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-30 14:56:51
 * @version $Id$
 */
import {EventEmitter} from 'events'

var SettingStore = Object.assign({},EventEmitter.prototype,{
	users:[],

	getInfo:function(id){
		get('/api/yonghus/'+id,function(res){
			var name=res.username;
			var img=res.img;
			this.emit('info',name,img);
		}.bind(this));
	},

	save:function(username,path){
		var url='/api/yonghus/updateInfo';
		// console.log('formId',formId);
		post(url,{username:username,path:path},function(res){
			this.emit('get');
		}.bind(this),function(err){
			this.emit('fail');
		}.bind(this),false);
	},

	logout:function(){
		// var url='/api/accessTokens/Kh27NNAU5jgatcNiupdc0Bk3KePVmGDKKv5ZZTmd0mdTDrTSGrVIBvjxCF8PR8mF';
		// ajax({
		// 	method:"DELETE",
		// 	url:url,
		// 	success:function(res){
		// 		console.log(res);
		// 	}
		// })

		post('/api/yonghus/logout',{},function(res){
			console.log(res);
			// alert('haha');
			this.emit('logout');
		}.bind(this),function(err){
			console.log(err);
		})
	},

	addFailListener:function(cb){
		this.on('fail',cb);
	},

	removeFailListener:function(cb){
		this.removeListener('fail',cb);
	},

	addGetInfoListener:function(cb){
		this.on('info',cb);
	},

	removeGetInfoListener:function(cb){
		this.removeListener('info',cb);
	},

	addGetListener:function(cb){
		// console.log(this);
		this.on('get',cb);
	},

	addLogoutListener:function(cb){
		this.on('logout',cb);
	},

	removeGetListener:function(cb){
		this.removeListener('get',cb)
	},
	removeLogoutListener:function(cb){
		this.removeListener('logout',cb);
	},

	emitGet:function(){
		this.emit('get');
	}

})

export {SettingStore}
