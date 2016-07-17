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
			friends:[]
		};

		this._onGet=function(){
			this.setState({
				friends:FriendStore.users
			})
		}.bind(this);

	}

	componentWillMount(){
		FriendStore.addGetListener(this._onGet);
		// var token=this.props.location.state.token;
		FriendAction.getUsers(123);

	}

	componentDidMount(){
	}

	componentWillUnmount(){
		FriendStore.removeGetListener(this._onGet);
	}



	render(){
		// console.log(this.state.friends);
		var friend=this.state.friends.map(function(friend){
			// if(friend.id==this.props.location.state.id){
			// 	return
			// }
			return (
				<Friend email={friend.email} id={friend.id} key={friend.id}/>
				)
		}.bind(this));
		return (
			<div>
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




























