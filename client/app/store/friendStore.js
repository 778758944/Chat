/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-15 11:03:53
 * @version $Id$
 */

import {EventEmitter} from 'events'
var io=require('socket.io-client');
if(location.href.indexOf('xingwentao') != -1){
	var io_url="https://chat.xingwentao.top";
}
else{
	var io_url="http://localhost:3002";
}
// var io_url="http://localhost:3002";
// var io_url="https://chat.xingwentao.top";
var socket=io(io_url);

var FriendStore = Object.assign({},EventEmitter.prototype,{
	users:[],
	myself:{},
	counter:{},
	getUsers:function(access_token){
		var url='/api/yonghus/friendList'
		post(url,{},function(res){
			if(res.code==200){
				this.users=res.data.friends;	
				this.myself=res.data.myself;
				var friends=res.data.friends;

				for(var i=0;i<friends.length;i++){
					this.counter[friends[i].id]=friends[i].unreads.length;
				}
				// console.log('counter',this.counter);
				this.emitGet();
				this.emitAdd();
			}
			else{
				this.emit('fail');
			}
		}.bind(this),function(){
			this.emit('fail');
		}.bind(this));
	},

	setPoint:function(path){
		var url='/api/setPoint';
		post(url,{
			point:path,
		},function(res){
			console.log(res);
		})
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
	},

	addAddListener:function(cb){
		this.on('add',cb);
	},

	removeAddListener:function(cb){
		this.removeListener('add',cb);
	},

	emitAdd:function(){
		this.emit('add')
	}

})

socket.on('addCounter',function(userId){
	FriendStore.counter[userId]=FriendStore.counter[userId]+1;
	FriendStore.emitAdd();

});

export {FriendStore,socket}
// export {socket,FriendStore}






































