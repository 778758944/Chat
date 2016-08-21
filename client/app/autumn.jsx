/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-19 10:21:47
 * @version $Id$
 */
import React,{Component} from 'react'
import {render} from 'react-dom'
import Tip from './lib/component/tip.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Enhance} from './lib/enhance.js'





require('./reset.css');
require('./autumn.css');
injectTapEventPlugin();


class Autumn extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		setTimeout(function(){
			this.props.loaded();
		}.bind(this),2000)
	}

	render(){
		return (
			<div>
				<h2 onTouchTap={()=>{
					this.props.showTip('hellor',5000);
				}}>sjjs</h2>
				<h1 onTouchTap={()=>{
					this.props.loaded();
				}}>loaded</h1>
			</div>
			)
	}
}

var AutumnEnhance=Enhance(Autumn)
// var width=document.documentElement.clientWidth;
// var height=document.documentElement.clientHeight;

// console.log(width,height);


render(<AutumnEnhance/>,document.getElementById('wrap'));




































