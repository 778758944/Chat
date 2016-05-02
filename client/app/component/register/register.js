/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-31 16:31:53
 * @version $Id$
 */
import React from 'react'
import {Config,Validator} from '../../lib/validator'


class Register extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		var configs=[
			new Config('email',"isEmail",true),
			new Config('password',"isEmpty",true)
		];

		new Validator(configs,"register",true,function(ele,results){
			ele.nextSibling.innerHTML=results.info;
		},function(ele,results){
			ele.nextSibling.innerHTML=results.info;
		})
	}


	render(){
		return (
			<div className="wrap">
				<div className="input_area">
					<form id="form1">
						<div className="input_area_line">
							<input type="text" name="email" placeholder="请输入您的邮箱" value={this.props.email} onChange={this.props.changeEmail}/>
							<span>请输入正确的邮箱</span>
						</div>
						<div className="input_area_line">
							<input type="password" name="password" placeholder="请输入您的密码" value={this.props.password} onChange={this.props.changePasswd}/>
							<span>错误</span>
						</div>
					</form>
				</div>
				<button className="btn" id='register' onClick={this.props.submit}>登录</button>
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

































