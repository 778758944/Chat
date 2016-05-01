/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-23 17:51:43
 * @version $Id$
 */
import React from 'react'
import {MsgActions} from '../../actions/MsgAction' 
import {InfoBox,FormBox} from './chat'
import {MsgStore} from '../../store/MsgStore'

class ChatCtrl extends React.Component{
	constructor(props){
		super(props);
		this.state={
			msg:MsgStore.getAll()
		}

		this.sendMsg=function(msg){
			console.log(msg);
			MsgActions.sendMsg(msg);
		}

		this._onUpdate=function(){
			this.setState({
				msg:MsgStore.getAll()
			});
		}.bind(this);
	}

	componentDidMount(){
		MsgStore.addUpdateListener(this._onUpdate);
	}

	componentWillUnmount(){
		MsgStore.removeUpdateListener(this._onUpdate);
	}


	render(){
		return (
			<div className="wrapBox">
				<InfoBox msg={this.state.msg}/>
				<FormBox handle={this.sendMsg}/>
			</div>
			)
	}


}

export {ChatCtrl}







































