/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-23 21:35:27
 * @version $Id$
 */
import {EventEmitter} from 'events'
// var io=require('socket.io-client');
// import io from './socket.io'
// var io=require('socket.io-client')
// var io_url=location.protocol+'//'+location.hostname+':'+location.port;
// console.log(io_url);
// var io_url="http://0.0.0.0:3002"
// var socket=io(io_url);

// alert('kjsndjks');
import {socket} from './friendStore'

console.log(socket);


class MSGSTORE extends EventEmitter{
	constructor(){
		super();
		this.messages=[];
	}

	getAll(){
		return this.messages;
	}

	updateMsg(data){
		if(data.lx!='draw'){
			this.messages.push(data);
			this.emitUpdate();
		}
		else{
			this.emitDraw(data.msg);
		}
	}

	sendMsg(data){
		if(data.lx!='draw'){
			this.updateMsg(data);
		}
		socket.emit("sendMsg",data);
	}

	addUpdateListener(callback){
		this.on('update',callback);
	}

	removeUpdateListener(callback){
		this.removeListener('update',callback);
	}

	emitUpdate(){
		this.emit('update');
	}

	emitDraw(msg){
		this.emit('draw',msg);
	}

	addDrawListener(callback){
		this.on('draw',function(msg){
			// console.log('msg',msg);
			callback&&callback(msg.posx,msg.posy,true);
		});
	}

	removeDrawListener(callback){
		this.removeListener('draw',callback);
	}
}

var MsgStore=new MSGSTORE();


socket.on('news',function(data){
	// console.log('data',data);
	MsgStore.updateMsg(data);
});
export {MsgStore}


// var a={
// 	name:"jack",
// 	add:function(a,b){
// 		console.log(this);            
// 		var c = function (argument) {
// 			console.log(this)
// 		}
// 		c()
// 	}
// }
// a.add()

// b.apply(a);



// var a=function(array,type){
// 	if(array instanceof Array||array instanceof Object){
// 		if(Object.prototype.toString.apply(array)=="[object Array]"){
// 			array.forEach(function(n){
// 				console.log(n);
// 			})
// 		}
// 		else{
// 			for(j in array){
// 				if(type){
// 					console.log(j);
// 				}
// 				else{
// 					if(array.hasOwnProperty(j)){
// 						console.log(j)
// 					}
// 				}
// 			}
// 		}
// 	}
// 	else{
// 		console.log("can not itera");
// 	}
// }

// var each = function (obj, callback) {
// 	if(Object.prototype.toString.apply(obj)==="[object Array]"){
// 		var value = "";
// 		for (var i = 0, l = obj.length; i < l; i++) {
// 			value = callback.call(obj[i], i, obj[i]);
// 			if (value === false) break;
// 		}
// 	} else if(Object.prototype.toString.apply(obj)==="[object Object]"){
// 		var value="";
// 		for (j in obj){
// 			if(obj.hasOwnProperty(j)){
// 				value=callback.call(obj[j],j,obj[j]);
// 				if(value===false) break;
// 			}
// 		}
// 	}
// 	return obj;
// }

// $.each()














