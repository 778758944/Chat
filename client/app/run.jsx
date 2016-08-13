/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-08 15:46:12
 * @version $Id$
 */
require('./run.css');
import React from 'react'
import {render} from 'react-dom'
import {Router,Route,IndexRoute,Link,hashHistory,Redirect,browserHistory} from 'react-router'
import Sprite from './lib/sprite'


var runnerCells = [
      { left: 0,   top: 0, width: 47, height: 64 },
      { left: 55,  top: 0, width: 44, height: 64 },
      { left: 107, top: 0, width: 39, height: 64 },
      { left: 150, top: 0, width: 46, height: 64 },
      { left: 208, top: 0, width: 49, height: 64 },
      { left: 265, top: 0, width: 46, height: 64 },
      { left: 320, top: 0, width: 42, height: 64 },
      { left: 380, top: 0, width: 35, height: 64 },
      { left: 425, top: 0, width: 35, height: 64 },
    ];

var spritesheet=new Image();

var img_url=require('./running.png');


class Spritesheet{
	constructor(cells){
		this.cells=cells||[];
		this.cellIndex=0;
	}

	advance(){
		if(this.cellIndex==this.cells.length-1){
			this.cellIndex=0;
		}
		else{
			this.cellIndex++;
		}
	}

	paint(sprite,ctx){
		var cell=this.cells[this.cellIndex];
		ctx.drawImage(
			spritesheet,
			cell.left,
			cell.top,
			cell.width,
			cell.height,
			sprite.left,
			sprite.top,
			cell.width,
			cell.height
			);
	}
}

var runInPlace={
	lastupdate:0,
	intervel:50,
	execute:function(sprite,ctx,now){
		// if(now-this.lastupdate>this.interval){
			sprite.painter.advance();
			this.lastupdate=now;
		// }
	}
}

var move={
	lastmove:0,
	execute:function(sprite,ctx,now){
		sprite.left=sprite.left-3;
		this.lastmove=now;
	}
}


var sprite=new Sprite('spritesheet',new Spritesheet(runnerCells),[runInPlace,move]);




class Run extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

class Running extends React.Component{
	constructor(props){
		super(props);
		this.cvs='';
		this.ctx='';
		this.flag=0;

		this.test=function(){
			var ctx=this.ctx;
			// sprite.update(ctx);
			sprite.paint(ctx);
		}

		this.animate=function(){
			var ctx=this.ctx;
			var cvs=this.cvs;
			ctx.clearRect(0,0,cvs.width,cvs.height);
			sprite.update(ctx,new Date());
			sprite.paint(ctx);
			requestAnimationFrame(this.animate);
		}.bind(this);

		this.motionHandle=function(e){
			var cvs=this.cvs;
			var ctx=this.ctx;
			var acc=event.accelerationIncludingGravity.y;

			if(this.flag>0){
				if(acc<0){
					console.log('update');
					if(Math.abs(acc)>0.001){
						this.flag=acc;
						ctx.clearRect(0,0,cvs.width,cvs.height);
						sprite.update(ctx);
						sprite.paint(ctx);
					}
				}
			}
			else{
				if(acc>0){
					console.log('update')
					if(Math.abs(acc)>0.001){
						this.flag=acc;
						ctx.clearRect(0,0,cvs.width,cvs.height);
						sprite.update(ctx);
						sprite.paint(ctx);
					}
				}
			}
		}.bind(this);


	}

	componentDidMount(){
		// this.test();
		var self=this;
		sprite.left=300;
		spritesheet.onload=function(){
			// self.animate();
			self.test();
			window.addEventListener('devicemotion',self.motionHandle,false);
		};

		// console.log(self);

		spritesheet.src=img_url;
		
	}

	render(){
		var client_width=document.documentElement.clientWidth;
		var client_height=document.documentElement.clientHeight;
		return (
			<canvas width={client_width} height={client_height} ref={(e)=>{
				this.cvs=e;
				this.ctx=e.getContext('2d');
			}}></canvas>
			)
	}
}



render(
	<Router history={hashHistory}>
		<Route path='/' component={Run}>
			<IndexRoute component={Running}/>
		</Route>
	</Router>,document.getElementById('wrap'));






























