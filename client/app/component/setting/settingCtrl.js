/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-30 14:37:11
 * @version $Id$
 */
import React,{Component} from 'react'
import SettingAction from '../../actions/SettingAction'



class SettingCtrl extends Component{
	constructor(props){
		super(props);
		this.state={
			name:'',
			needPic:false,
			imgurl:'',
			imgPath:''
		};

		this.onChangeText=function(e){
			var value=e.target.value;
			this.setState({
				name:value
			})
			
		}.bind(this);

		this.submit=function(){
			SettingAction.save(this.state.name,this.state.imgPath);
		}.bind(this);

		this._onChange=function(e){
			var file=e.target.files[0];
			var fileReader=new FileReader();


			fileReader.onload=function(e){
				var img=e.target.result;
				this.setState({
					needPic:true,
					imgurl:img
				})
			}.bind(this);

			fileReader.readAsDataURL(file);
		}.bind(this);

		this.uploaded=function(path){
			this.setState({
				needPic:false,
				imgPath:path
			})
		}.bind(this)

	}

	componentWillMount(){

	}

	componentDidMount(){
		SettingAction.setPoint(this.props.location.pathname);
	}

	componentWillUnmount(){

	}



	render(){
		var pic;
		var width=document.documentElement.clientWidth;
		var height=document.documentElement.clientHeight;
		if(this.state.needPic){
			pic=<DealPic img={this.state.imgurl} bl={1} uploaded={this.uploaded}/>
		}
		return (
			<div className='warp'>
				{pic}
				<form id='from1'>
					<div>
						<span>头像:</span>
						<input type="file" name='tx' onChange={this._onChange}/>
					</div>
					<div>
						<span>昵称:</span>
						<input type="text" name="username" onChange={this.onChangeText} value={this.state.name}/>
						<input type='hidden' name='imgPath' value={this.state.imgPath}/>
					</div>
				</form>
				<button onClick={this.submit}>保存</button>
			</div>
			)
	}
}

class DealPic extends React.Component{
	constructor(props){
		super(props);
		this.state={
			img:'',
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight,
			showImg:true,
			cvsHeight:0,
			cvsWidth:0
		}

		this.cvs='';
		this.ctx='';
		this.top=0;
		this.rect='';
	}


	componentDidMount(){
		var rect=new Select(this.ctx,this.cvs,100,100);
		var img=new Image();






		img.onload=function(){
			var c_height=this.state.width/img.width*img.height;

			var cvs_height=(this.state.width)/this.props.bl;

			if(cvs_height<c_height){
				this.top=(this.state.height-cvs_height)/2;
				this.rect=new Select(this.ctx,this.cvs,this.state.width,cvs_height,0,this.top,1,img,c_height);
			}
			else{
				this.top=(this.state.height-c_height)/2;
				var cvs_width=c_height*this.props.bl;
				this.rect=new Select(this.ctx,this.cvs,cvs_width,c_height,0,this.top,2,img);

			}


		}.bind(this);

		img.src=this.props.img;
	}

	render(){


		if(this.state.showImg){
			var img=<img src={this.props.img} style={{width:this.state.width,verticalAlign:"middle"}}/>;
		}



		return (
			<div style={{
				width:this.state.width,
				height:this.state.height,
				// position:"absolute",
				top:0,
				left:0,
				display:'table-cell',
				verticalAlign:"middle"
			}}>
				{img}
				<canvas ref={(e)=>{
					if(!this.cvs){
						this.cvs=e;
						this.ctx=e.getContext('2d');
					}
				}} width={this.state.width} height={this.state.height} style={{
					position:'absolute',
					left:0,
					top:0
				}}></canvas>
				<button style={{position:"absolute",top:0,left:0}} onClick={()=>{
					var data=this.rect.getImage();
					post('/api/uploadImg',{data:data},function(res){
						this.props.uploaded(res.path);
					}.bind(this));
				}}>确定</button>
			</div>
			)
	}
}


class Select{
	constructor(ctx,cvs,width,height,x,y,type,img,img_h){
		this.ctx=ctx;
		this.width=width;
		this.height=height;
		this.cvs=cvs;
		this.posx=x;
		this.posy=y;
		this.type=type;
		this.img=img;
		this.img_h=img_h;
		ctx.save();
		ctx.fillStyle='rgba(0,0,0,0.5)';
		ctx.fillRect(0,0,this.cvs.width,this.cvs.height);
		ctx.restore();

		ctx.save();
		ctx.globalCompositeOperation="destination-out";
		ctx.fillRect(this.posx,this.posy,this.width,this.height);
		ctx.restore();

		var startX,startY,canDrag=false;

		this.cvs.addEventListener('touchstart',function(e){
			var touch=e.touches[0];
			startX=e.touches[0].clientX;
			startY=e.touches[0].clientY;
			var if1=startX>this.posx&&startX<this.posx+this.width;
			var if2=startY>this.posy&&startY<this.posy+this.height;
			if(if1&&if2){
				canDrag=true;
			}
		}.bind(this));

		this.cvs.addEventListener('touchmove',function(e){
			if(canDrag){
				var endx=e.touches[0].clientX;
				var endy=e.touches[0].clientY;

				var disx=endx-startX;
				var disy=endy-startY;

				var fx=this.posx+disx;
				var fy=this.posy+disy;

				if(this.type==1){

					var ch=(this.cvs.height-this.img_h)/2;
					var if1=fy>ch&&fy+this.height<this.cvs.height-ch;
					// this.posx=fx;
					if(if1){
						this.posy=fy;
						// startX=endx;
						startY=endy;
						this.move(this.posx,this.posy);
					}
				}
				else{
					var if1=fx>0&&fx+this.width<this.cvs.width;
					if(if1){
						this.posx=fx;
						startX=endx;
						this.move(this.posx,this.posy);
					}
				}
			}

		}.bind(this));

		this.cvs.addEventListener('touchend',function(e){
			canDrag=false;
		})
	}

	move(x,y){
		var width=this.cvs.width;
		var height=this.cvs.height;
		var ctx=this.ctx;
		ctx.clearRect(0,0,width,height);
		ctx.save();
		ctx.fillStyle='rgba(0,0,0,0.5)';
		ctx.fillRect(0,0,width,height);
		ctx.restore();
		ctx.save();
		ctx.globalCompositeOperation="destination-out";
		ctx.fillStyle='#f00';
		ctx.fillRect(x,y,this.width,this.height);
		ctx.restore();	
	}

	getImage(){
		var cvs=document.createElement('canvas');
		cvs.width=this.width;
		cvs.height=this.height;
		var ctx=cvs.getContext('2d');
		if(this.type==2){
			ctx.drawImage(this.img,-this.posx,0,this.cvs.width,this.height);
		}
		else{
			var ch=(this.cvs.height-this.img_h)/2-this.posy;
			ctx.drawImage(this.img,0,ch,this.cvs.width,this.img_h);
		}
		var data=cvs.toDataURL();
		return data.substr(22);
	}
}





SettingCtrl.contextTypes={
	router:React.PropTypes.object,
	state:React.PropTypes.object
}
module.exports=SettingCtrl;
