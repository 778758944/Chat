/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-23 21:35:27
 * @version $Id$
 */
import {EventEmitter} from 'events'
import io from './socket.io'
var io_url=location.protocol+'//'+location.hostname+':'+location.port;
console.log(io_url);
var socket=io(io_url);


class MSGSTORE extends EventEmitter{
	constructor(){
		super();
		this.messages=[];
	}

	getAll(){
		return this.messages;
	}

	updateMsg(data){
		this.messages.push(data);
		this.emitUpdate();
	}

	sendMsg(data){
		this.updateMsg(data);
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
}

var MsgStore=new MSGSTORE();


socket.on('news',function(data){
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














