/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-23 22:14:17
 * @version $Id$
 */
import {Dispatcher} from 'flux'

var MsgStore,LoginStore,FrinedStore,SettingStore;


var AppDispatcher=new Dispatcher();
AppDispatcher.register(function(actions){
	switch(actions.actionType){
		case 'SEND MESSAGE':
			require.ensure([],function(require){
				MsgStore=require('../store/MsgStore').MsgStore;
				MsgStore.sendMsg(actions.text);
			})
			break;

		case 'LOGIN':
			require.ensure([],function(require){
				LoginStore=require('../store/loginStore').LoginStore;
				LoginStore.login(actions.email,actions.password);
			})
			break;

		case 'GET USER':
			require.ensure([],function(require){
				FrinedStore=require('../store/friendStore').FriendStore;
				FrinedStore.getUsers(actions.token);
			})
			break;

		case 'SAVE INFO':
			require.ensure([],function(require){
				SettingStore=require('../store/settingStore').SettingStore;
				SettingStore.save(actions.username,actions.path);
			})
			break;




		default:
	}
})

export {AppDispatcher}
