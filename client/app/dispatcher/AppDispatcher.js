/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-23 22:14:17
 * @version $Id$
 */
import {Dispatcher} from 'flux'
import {MsgStore} from '../store/MsgStore'

var AppDispatcher=new Dispatcher();
AppDispatcher.register(function(actions){
	switch(actions.actionType){
		case 'SEND MESSAGE':
			MsgStore.sendMsg(actions.text);
			break;

		default:
	}
})

export {AppDispatcher}
