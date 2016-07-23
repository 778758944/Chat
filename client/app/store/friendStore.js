/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-15 11:03:53
 * @version $Id$
 */

import {EventEmitter} from 'events'
var io=require('socket.io-client');
var io_url="http://localhost:3002";
// var io_url="https://chat.xingwentao.top";
var socket=io(io_url);

var FriendStore = Object.assign({},EventEmitter.prototype,{
	users:[],

	getUsers:function(access_token){
		var url='/api/yonghus/friendList'
		get(url,function(res){
			if(res.code==200){
				this.users=res.data;	
				this.emitGet();
			}
		}.bind(this));
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

export {FriendStore,socket}
// export {socket,FriendStore}






































