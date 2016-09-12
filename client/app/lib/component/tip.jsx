/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-19 10:32:25
 * @version $Id$
 */
import React,{Component} from 'react'
var style=require('./component.scss');


class Tip extends Component{
	constructor(props){
		super(props);
		this.state={
			msg:"message"
		}
		this.tip='';
		this.msg;

		this.show=function(msg,time){
			this.setState({
				msg:msg
			})
			var interval=time||2000;
			this.tip.style.opacity=1;
			this.tip.style.bottom='20%';
			setTimeout(function(){
				this.tip.style.opacity=0;	
				this.tip.style.bottom='-20%';
			}.bind(this),interval)
		}.bind(this);
	}

	render(){
		return (
				<div className={style.tipWrap} ref={(e)=>this.tip=e}>
					<div className={style.tipInner}>
						<span className={style.tipMsg}>{this.state.msg}</span>
					</div>
				</div>
			)
	}
}

Tip.defaultProps={
	msg:"hello world"
}

export default Tip































