/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-02 22:01:15
 * @version $Id$
 */
import {AppDispatcher} from '../dispatcher/AppDispatcher'

var LoginAction={
	toLogin:function(email,password){
		AppDispatcher.dispatch({
			actionType:'LOGIN',
			email:email,
			password:password
		})
	}
}


export {LoginAction};

























