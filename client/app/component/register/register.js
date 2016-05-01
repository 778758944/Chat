/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-31 16:31:53
 * @version $Id$
 */
import React from 'react'
import {Config,Validator} from '../../lib/validator'


class Input extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		var configs=[
			new Config('mail',"isEmpty"),
			new Config('password','isEmpty')
		];

		new Validator(configs,"form1",true,function(ele,results){
			// alert('right');
			console.log(ele);
			console.log(results);
		},function(ele,results){
			// alert('error');
			console.log(results)
		})
	}


	render(){
		return (
			<div className="input_area">
				<form id="form1">
					<div className="input_area_line">
						<input type="text" name="mail" placeholder="请输入您的邮箱"/>
					</div>
					<div className="input_area_line">
						<input type="password" name="password" placeholder="请输入您的密码"/>
					</div>
				</form>
			</div>
			)
	}
}

class Register extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="wrap">
				<Input/>
				<button className="btn">登录</button>
			</div>
			)
	}
}

export {Register}

































