import React from 'react'
import {render} from 'react-dom'
import {Router,Route,IndexRoute,Link,hashHistory,Redirect,browserHistory} from 'react-router'
import './lib/ajax.js'
import {app} from './component/index'
var ReactCSSTransitionGroup=require('react-addons-css-transition-group');
// import {registerCtrl} from './component/register/registerCtrl'

require('./main.css');
require('./reset.css');

console.log('kkdddd');

var hidden,visibleChange;
if(typeof document.hidden !== 'undefined'){
	hidden='hidden';
	visibleChange='visibilitychange';
}
else if(typeof document.mozHidden !== 'undefined'){
	hidden='mozHidden';
	visibleChange='mozvisibilitychange';
}
else if(typeof document.msHidden !== 'undefined'){
	hidden='msHidden';
	visibleChange='msvisibilitychange';
}
else if(typeof document.webkitHidden !== 'undefined'){
	hidden='webkitHidden';
	visibleChange='webkitvisibilitychange';
}


function visibleHandle(){
	if(document[hidden]){
		post('/api/setPoint',{point:"/offline"},function(res){
			console.log(res);
		})
		// console.log('no visible');
	}
	else{
		//console.log('visible');
	}
}

document.addEventListener(visibleChange,visibleHandle);


const App=React.createClass({
	transitionName:'viewchange',
	getInitialState(){
		return {
			transitionName:"viewchange"
		}
	},
	componentDidMount(){
	},
	componentWillReceiveProps(nextProps){
		var action=nextProps.location.action;
		if(action=='POP'){
			this.setState({transitionName:'viewback'});
		}
		else{
			this.setState({transitionName:"viewchange"});
		}

	},
	render(){
		return (
				<div className="wrap">
					<ReactCSSTransitionGroup transitionName={this.state.transitionName}>
						{React.cloneElement(this.props.children, {
				            key: this.props.location.pathname
				          })}
					</ReactCSSTransitionGroup>
				</div>
			)
	}
});

App.contextTypes={
	router:React.PropTypes.object
}

const routes={
	path:'/',
	component:App,
	onEnter:(params)=>{console.log('params',params)},
	indexRoute:{
		getComponent(nextState,cb){
			require.ensure([],function(require){
				cb(null,require('./component/friend/friendCtrl'));
			})
		}
	},
	childRoutes:app
}





window.onload=function(){
	render((
	<Router history={hashHistory} routes={routes}>
		
	</Router>
	),document.getElementById('wrap'));
}


// render((
// 	<Router history={hashHistory} routes={routes}>
		
// 	</Router>
// 	),document.getElementById('wrap'));


















































