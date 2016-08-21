/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-31 16:31:53
 * @version $Id$
 */
import React from 'react'
import {Config,Validator} from '../../lib/validator'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();




class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={
			nana:'wrong'
		}
		this.getName=function(){
			console.log('nana');
			this.setState({
				nana:"right"
			})
		}
	}

	componentDidMount(){
		// var configs=[
		// 	new Config('email',"isEmail",true),
		// 	new Config('password',"isEmpty",true)
		// ];

		// new Validator(configs,"register",true,function(ele,results){
		// 	ele.nextSibling.innerHTML=results.info;
		// },function(ele,results){
		// 	ele.nextSibling.innerHTML=results.info;
		// })
	}


	render(){
		return (
			<div className="wrap">
				<div className="input_area">
					<form id="form1">
						<div className="input_area_line">
							<input type="text" name="email" placeholder="请输入您的邮箱" value={this.props.email} onChange={this.props.changeEmail}/>
						</div>
						<div className="input_area_line">
							<input type="password" name="password" placeholder="请输入您的密码" value={this.props.password} onChange={this.props.changePasswd}/>
						</div>
					</form>
					<button className="btn" id='register' onTouchTap={this.props.submit}>登录</button>
				</div>
			</div>
			)
	}
}

// class Register extends React.Component{
// 	constructor(props){
// 		super(props);
// 	}

// 	render(){
// 		return (
// 			<div className="wrap">
// 				<Input/>
// 				<button className="btn" id='register'>登录</button>
// 			</div>
// 			)
// 	}
// }

export {Register}

































