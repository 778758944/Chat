/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-15 11:24:32
 * @version $Id$
 */
import {AppDispatcher} from '../dispatcher/AppDispatcher'

var FriendAction={
	getUsers:function(token){
		// console.log("kk");
		AppDispatcher.dispatch({
			actionType:'GET USER',
			token:'123'
		})
	}
}

export default FriendAction;
