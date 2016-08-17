/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-14 21:49:59
 * @version $Id$
 */
import React,{Component} from 'react'
import Friend from './friend'



import {FriendStore} from '../../store/friendStore'
import FriendAction from '../../actions/friendAction'

class FriendCtrl extends Component{
	constructor(props){
		super(props);
		this.state={
			friends:[],
			myself:{}
		};

		this._onGet=function(){
			this.setState({
				friends:FriendStore.users,
				myself:FriendStore.myself
			});
		}.bind(this);

		this._onFail=function(){
			console.log('fail');
			this.context.router.replace('/register');
		}.bind(this);

	}

	componentWillMount(){
		FriendStore.addGetListener(this._onGet);
		FriendStore.addFailListener(this._onFail);
		// var token=this.props.location.state.token;
		FriendAction.getUsers(123);

	}

	componentDidMount(){
		console.log(this.props.location.pathname);
		FriendAction.setPoint(this.props.location.pathname);
		// console.log('router',this.context.router);
	}

	componentWillUnmount(){
		FriendStore.removeGetListener(this._onGet);
		FriendStore.removeGetListener(this._onFail);
	}



	render(){
		var myself=this.state.myself;
		// console.log(this.state.friends);
		var friend=this.state.friends.map(function(friend){
			// if(friend.id==this.props.location.state.id){
			// 	return
			// }
			return (
				<Friend email={friend.username ? friend.username:friend.email} img={friend.img} id={friend.id} key={friend.id} myimg={myself.img}/>
				)
		}.bind(this));
		return (
			<div>
				<Friend email={myself.username ? myself.username:myself.email} img={myself.img} id={myself.id} path={'/setting'}/>
				{friend}
			</div>
			)
	}
}


FriendCtrl.contextTypes={
	router:React.PropTypes.object,
	state:React.PropTypes.object
}
module.exports=FriendCtrl;




























