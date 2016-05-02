/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-31 16:39:07
 * @version $Id$
 */
import React from 'react'
import {Register} from './register'
import {Config,Validator} from '../../lib/validator'
import {LoginStore} from '../../store/loginStore'
import {LoginAction} from '../../actions/LoginAction'

// console.log(Config);

class RegisterCtrl extends React.Component{
	constructor(props){
		super(props);
		this.state={
			email:'778758944@qq.com',
			password:''
		}

		this.changeEmail=function(e){
			this.setState({
				email:e.target.value
			})
		}.bind(this)


		this.changePasswd=function(e){
			this.setState({
				password:e.target.value
			})
		}.bind(this)


		this.submit=function(e){
			LoginAction.toLogin(this.state.email,this.state.password);
		}.bind(this);

	}

	componentDidMount(){
		LoginStore.addLoginHandle(function(res){
			console.log(res);
			if(res.id){
				window.location.hash='#/chat';
			}
		})
	}

	render(){
		return (
			<Register email={this.state.email} password={this.state.password} changeEmail={this.changeEmail} changePasswd={this.changePasswd} submit={this.submit}/>
			)
	}
}
export {RegisterCtrl}






















