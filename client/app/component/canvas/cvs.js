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
		this.dot=[];
		this.dotStart=1;

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
			this.ctx.closePath();
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

		this.drawLineStart=function(x,y,isRecive){
			var ctx=this.ctx;
			ctx.save();
			ctx.beginPath();
			// var gradient=this.ctx.createRadialGradient(x,y,0,x,y,5);
			// gradient.addColorStop(0,"rgba(255,0,0,1)");
			// gradient.addColorStop(1,"rgba(255,0,0,0.2)");
			ctx.fillStyle='#00f';
			ctx.strokeStyle='#f00';
			ctx.lineWidth=5;
			ctx.moveTo(x,y);
			if(!isRecive){
				var msg={
					posx:x/this.state.width,
					posy:y/this.state.height,
					state:'start'
				}
				// MsgActions.sendMsg({msg:msg,to:this.props.params.id,lx:'draw',state:"start"});
			}
		}.bind(this);

		this.drawLine=function(x,y,isRecive){
			var ctx=this.ctx;
			ctx.lineTo(x,y);
			ctx.stroke();
			if(!isRecive){
				var msg={
					posx:x/this.state.width,
					posy:y/this.state.height,
					state:'move'
				}
				// MsgActions.sendMsg({msg:msg,to:this.props.params.id,lx:'draw',state:"move"});
			}
			// ctx.fill();
		}.bind(this);

		this.drawLineEnd=function(isRecive){
			// ctx.lineTo(x,y);
			this.ctx.closePath();
			// ctx.stroke();
			this.ctx.restore();

			if(!isRecive){
				// MsgActions.sendMsg({msg:{state:'end'},to:this.props.params.id,lx:'draw',state:"end"});
			}
		}.bind(this);

		this.autoDraw=function(x,y,state){
			// if(this.beDraw){
				// console.log(state);

				if(state=='start'){
					var posx=this.state.width*x;
					var posy=this.state.height*y;
					this.drawLineStart(posx,posy,true);
				}
				else if(state=='move'){
					// console.log()
					var posx=this.state.width*x;
					var posy=this.state.height*y;
					this.drawLine(posx,posy,true);
				}
				else if(state=='end'){
					this.drawLineEnd(true);
				}
			// }
		}.bind(this)

		this.clear=function(){
			this.ctx.clearRect(0,0,this.state.width,this.state.height);
		}.bind(this);

		this.redrawing=function(){
			console.log('redrawing');
			// console.log(this.dot[this.])
			var dot=this.dot[this.dotStart];
			if(dot){
				this.drawLine(dot.x,dot.y);
				this.dotStart+=1;
				requestAnimationFrame(this.redrawing);
			}
			else{
				this.drawLineEnd();
			}
		}.bind(this);

		this.redraw=function(){
			if(this.dot[0]){
				this.dotStart=1;
				this.clear();
				this.drawLineStart(this.dot[0].x,this.dot[0].y);
				this.redrawing();
			}
		}.bind(this);
	}

	componentWillMount(){

	}

	componentDidMount(){
		MsgStore.addDrawListener(function(x,y,state){
			if(this.beDraw){
				// console.log(state);
				// var posx=this.state.width*x;
				// var posy=this.state.height*y;
				this.autoDraw(x,y,state);
			}
		}.bind(this));

	}

	render(){
		return (
			<div>
				<button onClick={this.clear} style={{position:'absolute',top:0,left:0}}>清除</button>
				<button onClick={this.redraw} style={{position:'absolute',top:0,left:100}}>回放</button>
				<canvas width={this.state.width} height={this.state.height} ref={(e)=>{
					if(e){
						this.ctx=e.getContext('2d');
						this.cvs=e;
					}
				}} onTouchStart={(e)=>{
					e.nativeEvent.preventDefault()
					this.dot=[];
					this.beDraw=false;
					this.drawLineStart(e.nativeEvent.touches[0].clientX,e.nativeEvent.touches[0].clientY);
					var dot={x:e.nativeEvent.touches[0].clientX,y:e.nativeEvent.touches[0].clientY};
					this.dot.push(dot);
				}} onTouchMove={(e)=>{
					var native=e.nativeEvent;
					// console.log(native);
					var posx=native.touches[0].clientX;
					var posy=native.touches[0].clientY;
					// this.draw(posx,posy,false);
					this.drawLine(posx,posy);
					var dot={x:posx,y:posy};
					this.dot.push(dot);
				}} onTouchEnd={(e)=>{
					this.beDraw=true
					this.drawLineEnd()
				}}></canvas>
			</div>
			)
	}
}

Cvs.contextTypes={
	state:React.PropTypes.object
}

module.exports=Cvs
