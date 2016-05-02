/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-02 21:48:32
 * @version $Id$
 */
import {EventEmitter} from 'events'

var LoginStore=Object.assign({},EventEmitter.prototype,{
	login:function(email,password){
		post('/api/yonghus/login',{
			email:email,
			password:password
		},function(res){
			this.emit('tologin',res);
		}.bind(this))
	},

	addLoginHandle:function(callback){
		this.on('tologin',callback);
	}
});

export {LoginStore};


































