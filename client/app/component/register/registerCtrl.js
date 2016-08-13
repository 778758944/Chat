/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-31 16:39:07
 * @version $Id$
 */
import React from 'react'
import {Register} from './register'
// import {Config,Validator} from '../../lib/validator'
import {LoginStore} from '../../store/loginStore'
import {LoginAction} from '../../actions/LoginAction'
// import {RouterContext} from 'react-router'
import {Router} from 'react-router'

// var router=RouterContext.router;

// console.log(Config);

class RegisterCtrl extends React.Component{
	constructor(props){
		super(props);
		this.state={
			email:'778758944@qq.com',
			password:'123456'
		}

		this.changeEmail=function(e){
			this.setState({
				email:e.target.value
			})
		}.bind(this)

		this.rel='';


		this.changePasswd=function(e){
			this.setState({
				password:e.target.value
			})
		}.bind(this)


		this.submit=function(e){
			console.log('sdsd');
			LoginAction.toLogin(this.state.email,this.state.password);
		}.bind(this);

	}

	// static:{}

	componentDidMount(){
		// setTimeout(function(){
		// 	this.ref.getName()
		// }.bind(this),5000)
		var router=this.context.router;
		LoginStore.addLoginHandle(function(res){
			console.log(res);
			if(res.id){
				// Router.go('/friend')
				router.push({
					pathname:'/friend',
					state:{token:res.id,id:res.userId}
				})
				// window.location.hash='#/register';
				// router.goBack();
			}
		})
	}

	render(){
		return (
			<Register 
				email={this.state.email} 
				password={this.state.password} 
				changeEmail={this.changeEmail} 
				changePasswd={this.changePasswd} 
				submit={this.submit}
				ref={(e)=>{this.ref=e}}
			/>
			)
	}
}


RegisterCtrl.contextTypes={
	router:React.PropTypes.object
}
module.exports=RegisterCtrl






















