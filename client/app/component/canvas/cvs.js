/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-23 10:49:13
 * @version $Id$
 */
import React from 'react'
import {MsgActions} from '../../actions/MsgAction' 
import {MsgStore} from '../../store/MsgStore'

// console.log('welcome cvs');

class Cvs extends React.Component{
	constructor(props){
		super(props);
		this.state={
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight,
		}
		this.cvs='';
		this.ctx='';
		this.beDraw=true;

		this.drawRect=function(){
			// this.ctx.fillStyle='#f00',
			// this.ctx.fillRect(0,0,100,100);
		}

		this.draw=function(x,y,isRecive){
			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.arc(x,y,10,Math.PI*2,false);
			var gradient=this.ctx.createRadialGradient(x,y,0,x,y,10);
			gradient.addColorStop(0,"rgba(255,0,0,0.8)");
			gradient.addColorStop(1,"rgba(255,0,0,0)");
			this.ctx.fillStyle=gradient;
			this.ctx.fill();
			this.ctx.restore();
			if(!this.isRecive){
				var msg={
					posx:x/this.state.width,
					posy:y/this.state.height
				}
				// console.log(this.props.params);
				MsgActions.sendMsg({msg:msg,to:this.props.params.id,lx:'draw'})
			}
		}

		this.clear=function(){
			this.ctx.clearRect(0,0,this.state.width,this.state.height);
		}.bind(this);
	}

	componentWillMount(){

	}

	componentDidMount(){
		MsgStore.addDrawListener(function(x,y,isRecive){
			if(this.beDraw){
				var posx=this.state.width*x;
				var posy=this.state.height*y;
				this.draw(posx,posy,true);
			}
		}.bind(this));

	}

	render(){
		return (
			<div>
				<button onClick={this.clear} style={{position:'absolute',top:0,left:0}}>清除</button>
				<canvas width={this.state.width} height={this.state.height} ref={(e)=>{
					if(e){
						this.ctx=e.getContext('2d');
						this.cvs=e;
					}
				}} onTouchStart={(e)=>{
					e.nativeEvent.preventDefault()
					this.beDraw=false;
				}} onTouchMove={(e)=>{
					var native=e.nativeEvent;
					// console.log(native);
					var posx=native.touches[0].clientX;
					var posy=native.touches[0].clientY;
					this.draw(posx,posy,false);
				}} onTouchEnd={()=>this.beDraw=true}></canvas>
			</div>
			)
	}
}

Cvs.contextTypes={
	state:React.PropTypes.object
}

module.exports=Cvs
