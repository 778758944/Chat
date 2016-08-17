/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-23 22:11:54
 * @version $Id$
 */
import {AppDispatcher} from '../dispatcher/AppDispatcher'

var MsgActions={
	sendMsg:function(msg){
		AppDispatcher.dispatch({
			actionType:'SEND MESSAGE',
			text:msg
		})
	},
	setPoint:function(path){
		AppDispatcher.dispatch({
			actionType:"SET POINT",
			path:path
		})
	}
}

export {MsgActions}
