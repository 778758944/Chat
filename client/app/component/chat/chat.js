/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-23 17:39:07
 * @version $Id$
 */
import React from 'react'
import {HZRecorder,dealWav} from '../../lib/getaudio'
import kevent from '../../lib/kevent'

var my_img=require('../../11.png');
var other_img=require('../../22.png');

class MineMsg extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var data=this.props.data;
		if(data.lx==0 || !data.lx){
			return (
				<div className='otherMsg oneMsg'>
					<img className='otherMsg_img' width={35} src={this.props.img}/>
					<div className='msgWrap otherWrap'>
						<p className='otherMsg_text oneText'>{this.props.data.msg}</p>
					</div>
				</div>
				)
		}
		else if(data.lx=='img'){

		
		return (
			<div className='otherMsg oneMsg'>
				<img className='otherMsg_img' width={35} src={this.props.img}/>
				<div className='msgWrap otherWrap'>
					<img src={data.msg} className="img"/>
				</div>
			</div>
			)
		}
		else if(data.lx=='wav'){
			return (
			<div className='otherMsg oneMsg'>
				<img className='otherMsg_img' width={35} src={this.props.img}/>
				<div className='msgWrap otherWrap'>
					<p className='otherMsg_text oneText' onClick={()=>{
						if(typeof data.msg == 'string'){
							console.log('string');
							this.props.audio.src=data.msg;
							this.props.audio.play();
						}
						else{
							this.props.audio.src=dealWav(new Blob([data.msg],{type: 'audio/wav'}));
							this.props.audio.play();
						}
					}}>播放语音</p>
				</div>
			</div>
			)
		}
		else{
			return <div></div>
		}
	}
}

class OtherMsg extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		if(this.props.data.lx=='tocvs'){
			this.props.toCvs();
		}
	}
	render(){
		var data=this.props.data;
		if(data.lx==0 || !data.lx){
			return (
				<div className="mineMsg oneMsg">
		  			      <img width={35} className="mineMsg_img" src={this.props.img}/>
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
		  			      <img width={35} className="mineMsg_img" src={this.props.img}/>
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
  			      <img width={35} className="mineMsg_img" src={this.props.img}/>
  			      <div className="msgWrap mineWrap">
	  			      <p className="mineMsg oneText" onClick={()=>{
	  			      	if(typeof data.msg == 'string'){
							console.log('string');
							this.props.audio.src=data.msg;
							this.props.audio.play();
						}
						else{
							this.props.audio.src=dealWav(new Blob([data.msg],{type: 'audio/wav'}));
							this.props.audio.play();
						}
	  			      }}>播放语音</p>
  			      </div>
  			   </div>
				)
		}
		else{
			return <div></div>
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
		this.fn_area;
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
  				this.fn_area.style.display='block';
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
			e.nativeEvent.preventDefault();
			// this.recoder.play(this.audio);
			this.props.handle({msg:this.recoder.getBlob(true),to:this.props.to,type:1,lx:'wav'})
		}.bind(this);
	}

	componentDidMount(){
		kevent.on('hide',function(){
			this.fn_area.style.display='none';
		}.bind(this))
	}
	render(){
		return (
			<div className='formWrap'>
				<audio ref={(e)=>{
					this.audio=e;
				}} autoPlay></audio>
				<div className="formTop">
					<textarea className='inp' resize='none' ref='txt' onChange={this._onChange.bind(this)} onFocus={()=>{
						this.fn_area.style.display='none';
					}}></textarea>
					<button className="sendBtn" onClick={this.sendMsg}>{this.state.btn}</button>
				</div>
				<div className='fn_area' ref={(e)=>this.fn_area=e}>
					<label htmlFor="fileup" className='iconGn iconGn_label'>图片</label>
					<input type="file" id='fileup' onChange={this.onFileChange}/>
					<button className='iconGn' onTouchStart={(e)=>{
						e.preventDefault();
						console.log('start');
						HZRecorder.get(function(rec){
							this.recoder=rec;
							this.recoder.start();
						}.bind(this))
					}} onTouchEnd={this.onRecoderEnd}>语音</button>
					<button onClick={()=>{
						this.props.handle({msg:{lx:'tocvs'},lx:'tocvs',to:this.props.to,type:1})
						this.props.toCvs()
					}} className='iconGn'>我画你猜</button>
					<button className='iconGn'>上传图片</button>
					<button className='iconGn'>上传图片</button>
					<button className='iconGn'>上传图片</button>
					<button className='iconGn'>上传图片</button>
					<button className='iconGn'>上传图片</button>
					<button className='iconGn'>上传图片</button>
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
		console.log(this.props.img);
	}
	render(){
		// console.log(this.props.msg);
		var inner=this.props.msg.map(function(value,index){
			console.log(value);
			if(value.type==1){
				return <MineMsg data={value} key={index} audio={this.props.audio} img={this.props.mine_img}/>
			}
			else{
				return <OtherMsg data={value} key={index} audio={this.props.audio} toCvs={this.props.toCvs} img={this.props.img}/>
			}
		}.bind(this));
		return (
			<div className='msgBox' onTouchTap={()=>{
				kevent.trigger('hide');
			}}>
				{inner}
			</div>
			)
	}
}

export {FormBox,InfoBox}






















