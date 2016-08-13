/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-30 15:34:48
 * @version $Id$
 */
import {AppDispatcher} from '../dispatcher/AppDispatcher'

var SettingAction={
	save:function(username,path){
		// console.log("kk");
		AppDispatcher.dispatch({
			actionType:'SAVE INFO',
			username:username,
			path:path
		})
	}
}

export default SettingAction;

