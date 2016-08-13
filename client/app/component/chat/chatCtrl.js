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

		this.audio='';

		this.sendMsg=function(msg){
			MsgActions.sendMsg(msg);
		}

		this._onUpdate=function(){
			this.setState({
				msg:MsgStore.getAll()
			});
		}.bind(this);

		this.toCvs=function(){
			// console.log('sdsds');
			this.context.router.push({
				pathname:'/cvs/'+this.props.params.id,
			})
			// console.log('cvs end');
		}
	}

	componentDidMount(){
		console.log(this.props.location);
		MsgStore.addUpdateListener(this._onUpdate);
	}

	componentWillUnmount(){
		MsgStore.removeUpdateListener(this._onUpdate);
	}


	render(){
		// console.log('kkk');
		return (
			<div className="wrapBox">
				<audio ref={(e)=>this.audio=e}></audio>
				<InfoBox msg={this.state.msg} audio={this.audio} toCvs={this.toCvs.bind(this)} img={this.props.location.state.other_img} mine_img={this.props.location.state.mine_img}/>
				<FormBox handle={this.sendMsg} to={this.props.params.id} toCvs={this.toCvs.bind(this)}/>
			</div>
			)
	}
}

ChatCtrl.contextTypes={
	router:React.PropTypes.object
}

module.exports=ChatCtrl







































