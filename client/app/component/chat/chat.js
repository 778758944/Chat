/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-23 17:39:07
 * @version $Id$
 */
import React from 'react'
import {HZRecorder,dealWav} from '../../lib/getaudio'

console.log(HZRecorder);

var my_img=require('../../11.png');
var other_img=require('../../22.png');

class MineMsg extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var data=this.props.data;
		if(!data.lx){
			return (
				<div className='otherMsg oneMsg'>
					<img className='otherMsg_img' width={35} src={my_img}/>
					<div className='msgWrap otherWrap'>
						<p className='otherMsg_text oneText'>{this.props.data.msg}</p>
					</div>
				</div>
				)
		}
		else if(data.lx=='img'){

		
		return (
			<div className='otherMsg oneMsg'>
				<img className='otherMsg_img' width={35} src={my_img}/>
				<div className='msgWrap otherWrap'>
					<img src={data.msg} className="img"/>
				</div>
			</div>
			)
		}
		else if(data.lx=='wav'){
			return (
			<div className='otherMsg oneMsg'>
				<img className='otherMsg_img' width={35} src={my_img}/>
				<div className='msgWrap otherWrap'>
					<p className='otherMsg_text oneText' onClick={()=>{
						this.props.audio.src=dealWav(new Blob([data.msg],{type: 'audio/wav'}));
						this.props.audio.play();
					}}>播放语音</p>
				</div>
			</div>
			)
		}
	}
}

class OtherMsg extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		var data=this.props.data;
		if(!data.lx){
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
		else if(data.lx=='img'){

			return (
				<div className="mineMsg oneMsg">
		  			      <img width={35} className="mineMsg_img" src={other_img}/>
		  			      <div className="msgWrap mineWrap">
			  			      <img src={data.msg} className="img"/>
			  			      <span className="caret"></span>
		  			      </div>
		  			   </div>
				)
		}
		else if(data.lx=='wav'){
			return (
				<div className="mineMsg oneMsg">
  			      <img width={35} className="mineMsg_img" src={other_img}/>
  			      <div className="msgWrap mineWrap">
	  			      <p className="mineMsg oneText" onClick={()=>{
	  			      	this.props.audio.src=dealWav(new Blob([data.msg],{type: 'audio/wav'}));
	  			      	this.props.audio.play();
	  			      }}>播放语音</p>
  			      </div>
  			   </div>
				)
		}
	}
}

class FormBox extends React.Component{
	constructor(props){
		super(props);
		this.state={
			btn:"+"
		}
		this.recoder;
		this.audio;
		this.sendMsg=function(){
			var msg=this.refs.txt.value;
  			this.refs.txt.value="";
  			if(msg){
  				this.setState({
  					btn:'+'
  				});
  				this.props.handle({msg:msg,type:1,to:this.props.to});
  			}
  			else{

  			}
		}.bind(this);

		this._onChange=function(){
			if(this.refs.txt.value){
				this.setState({
					btn:"发送"
				})
			}
			else{
				this.setState({
					btn:"+"
				})
			}
		}

		this.onFileChange=function(e){
			var reader=new FileReader();
			var img=e.target.files[0];
			reader.onload=function(res){
				var data=res.target.result;
				console.log(data);
				this.props.handle({msg:data,type:1,to:this.props.to,lx:'img'});
			}.bind(this);

			reader.readAsDataURL(img);
		}.bind(this);


		this.onRecoderEnd=function(e){
			this.recoder.play(this.audio);
			this.props.handle({msg:this.recoder.getBlob(true),to:this.props.to,type:1,lx:'wav'})
		}.bind(this);
	}
	render(){
		return (
			<div className='formWrap'>
				<audio ref={(e)=>{
					this.audio=e;
				}} autoPlay></audio>
				<div className="formTop">
					<textarea className='inp' resize='none' ref='txt' onChange={this._onChange.bind(this)}></textarea>
					<button className="sendBtn" onClick={this.sendMsg}>{this.state.btn}</button>
				</div>
				<div>
					<label htmlFor="fileup" className='iconGn'>图片</label>
					<input type="file" id='fileup' onChange={this.onFileChange}/>
					<button className='iconGn' onTouchStart={()=>{
						console.log('start');
						HZRecorder.get(function(rec){
							this.recoder=rec;
							this.recoder.start();
						}.bind(this))
					}} onTouchEnd={this.onRecoderEnd}>语音</button>
					<button>语音</button>
					<button>上传图片</button>
					<button>上传图片</button>
					<button>上传图片</button>
					<button>上传图片</button>
					<button>上传图片</button>
					<button>上传图片</button>
				</div>
			</div>
			)
	}
}


var MsgboxHeight=document.documentElement.clientHeight-60;

class InfoBox extends React.Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		// console.log(this.props.msg);
	}
	render(){
		// console.log(this.props.msg);
		var inner=this.props.msg.map(function(value,index){
			if(value.type==1){
				return <MineMsg data={value} key={index} audio={this.props.audio}/>
			}
			else{
				return <OtherMsg data={value} key={index} audio={this.props.audio}/>
			}
		}.bind(this));
		return (
			<div className='msgBox' style={{height:MsgboxHeight+"px"}}>
				{inner}
			</div>
			)
	}
}

export {FormBox,InfoBox}






















