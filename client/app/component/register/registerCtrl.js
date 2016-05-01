/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-31 16:39:07
 * @version $Id$
 */
import React from 'react'
import {Register} from './register'
import {Config,Validator} from '../../lib/validator'

// console.log(Config);

class RegisterCtrl extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){

	}

	render(){
		return (
			<Register/>
			)
	}
}
export {RegisterCtrl}
