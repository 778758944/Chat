/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-23 17:39:07
 * @version $Id$
 */
import React from 'react'

var my_img=require('../../11.png');
var other_img=require('../../22.png');

class MineMsg extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className='otherMsg oneMsg'>
				<img className='otherMsg_img' width={35} src={my_img}/>
				<div className='msgWrap otherWrap'>
					<p className='otherMsg_text oneText'>{this.props.data.msg}</p>
				</div>
			</div>
			)
	}
}

class OtherMsg extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="mineMsg oneMsg">
	  			      <img width={35} className="mineMsg_img" src={other_img}/>
	  			      <div className="msgWrap mineWrap">
		  			      <p className="mineMsg oneText">{this.props.data.msg}</p>
		  			      <span className="caret"></span>
	  			      </div>
	  			   </div>
			)
	}
}

class FormBox extends React.Component{
	constructor(props){
		super(props);
		this.sendMsg=function(){
			var msg=this.refs.txt.value;
  			this.refs.txt.value="";
  			this.props.handle({msg:msg,type:1});
		}.bind(this);
	}
	render(){
		return (
			<div className='formWrap'>
				<textarea className='inp' resize='none' ref='txt'></textarea>
				<button className="sendBtn" onClick={this.sendMsg}>发送</button>
			</div>
			)
	}
}


var MsgboxHeight=document.documentElement.clientHeight-60;

class InfoBox extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		var inner=this.props.msg.map(function(value,index){
			if(value.type==1){
				return <MineMsg data={value} key={index}/>
			}
			else{
				return <OtherMsg data={value} key={index}/>
			}
		})
		return (
			<div className='msgBox' style={{height:MsgboxHeight+"px"}}>
				{inner}
			</div>
			)
	}
}

export {FormBox,InfoBox}






















