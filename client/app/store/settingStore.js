/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-30 14:56:51
 * @version $Id$
 */
import {EventEmitter} from 'events'

var SettingStore = Object.assign({},EventEmitter.prototype,{
	users:[],

	save:function(username,path){
		var url='/api/yonghus/updateInfo';
		// console.log('formId',formId);
		post(url,{username:username,path:path},function(res){
			console.log(res);
		}.bind(this),function(err){
			console.log(err);
		},false);
	},

	addFailListener:function(cb){
		this.on('fail',cb);
	},

	removeFailListener:function(cb){
		this.removeListener('fail',cb);
	},

	addGetListener:function(cb){
		// console.log(this);
		this.on('get',cb);
	},

	removeGetListener:function(cb){
		this.removeListener('get',cb)
	},

	emitGet:function(){
		this.emit('get');
	}

})

export {SettingStore}
