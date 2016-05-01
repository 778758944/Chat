import React from 'react'
import {render} from 'react-dom'
import {Router,Route,IndexRoute,Link,hashHistory,Redirect,browserHistory} from 'react-router'
import {ChatCtrl} from './component/chat/chatCtrl'
import {RegisterCtrl} from './component/register/registerCtrl'

require('./main.css');
require('./reset.css');


const App=React.createClass({
	render(){
		return (
				<div className="wrap">
					{this.props.children}
				</div>
			)
	}
});


render((
	<Router history={hashHistory}>
		<Route path='/' component={App}>
			<Route path='chat' component={ChatCtrl}/>
			<Route path="register" component={RegisterCtrl}/>
		</Route>
	</Router>
	),document.getElementById('wrap'));


















































