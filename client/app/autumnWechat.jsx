/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-19 10:25:13
 * @version $Id$
 */
import React,{Component} from 'react'
import {render} from 'react-dom'
import './lib/ajax.js'
import kEnv from './lib/kenv'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Enhance} from './lib/enhance.js'
import kwechat from './lib/kwechat'
import md5 from 'md5'

require('./reset.css');
require('./autumn.css');
injectTapEventPlugin();

var id_arr=[
	'http://gw.aidaojiacdn.com/upload_24932c25ac7b29ac0bcee3878db5e149_750x530.jpg',//桃子元
	'http://gw.aidaojiacdn.com/upload_2dd6d3beb7bcf140dac603dd76d91d24_750x530.jpg',//萨拉米
	'http://gw.aidaojiacdn.com/upload_89d2c1dacb91ebed4815384a07c551cd_750x530.jpg',//螃蟹
	'http://gw.aidaojiacdn.com/upload_11b2323c2f03297b4207a49c424faa69_750x530.jpg',//顺日更
	'http://gw.aidaojiacdn.com/upload_01175140a5d0afab628d8fa38f0149c1_750x530.jpg',//多姿
	'http://gw.aidaojiacdn.com/upload_4b07984890ac639c5774ef882ad0e727_750x530.jpg',//光合
	'http://gw.aidaojiacdn.com/upload_99e60f3af9ac11b8778fc568d46bde89_750x530.jpg',//速淘
	'http://gw.aidaojiacdn.com/upload_cc9820a73066337178be4b7341127c54_750x530.jpg',//善味阁
	'http://gw.aidaojiacdn.com/upload_c8c98045a3f520f32447c997b1f7e565_750x530.jpg',//德清
	'http://gw.aidaojiacdn.com/upload_6f647084820ae8f7d9e6b583e78fc1a4_750x530.jpg',//赞或生鲜
	'http://gw.aidaojiacdn.com/upload_6fda9a5ebc4b9716b5f7c65ae245a500_750x530.jpg'//干的龙
]

class InputArea extends Component{
	constructor(props){
		super(props);
		this.state={
			mobile:'',
			code:'',
			time:60,
			canVerify:true
		}

		this.id='';
		this.secretuid='';

		this.timer='';

		this.getCode=function(){
			var mobile=this.state.mobile;
			var code=this.state.code;
			if(mobile.length!=11){
				this.props.showTip('请输入正确的手机号码',2000);
				return;
			}

			var sign=md5(this.props.id+(mobile+'aidaojia_activity'));

			var url='http://activityapi.aidaojia.com/verifycode?mobile='+mobile+'&activity='+this.props.id+'&sign='+sign;
			get(url,function(res){
				console.log(res)
				if(res.code==0){
					this.props.showTip('验证码发送成功',2000);
					this.setState({
						canVerify:false
					})

					this.timer=setInterval(function(){
						var time=this.state.time-1;
						if(time>0){
							this.setState({
								time:time,
							})
						}
						else{
							clearInterval(this.timer)
							this.setState({
								time:60,
								canVerify:true
							})
						}
					}.bind(this),1000)
				}
				else{
					this.props.showTip(res.msg,2000);
				}

			}.bind(this),function(err){
				this.props.showTip(err.msg,2000)
			}.bind(this))



			// var sign=md5('1'+'')
			// get("http://activityapi.test.aidaojia.com/verifycode",)
		}.bind(this);


		this.toDz=function(){
			var secretuid=this.props.secretuid;
			var id=this.props.id;
			var mobile=this.state.mobile;
			var code=this.state.code;
			if(mobile.length!=11){
				this.props.showTip('请输入正确的手机号码',2000);
				return;
			}

			if(code.length!=6){
				this.props.showTip('请输入六位验证码',2000);
				return;
			}

			if(!id||!secretuid){
				this.props.showTip('却少必要参数',2000);
				return;
			}

			var url='http://activityapi.aidaojia.com/doubleThumb?secretuid='+secretuid+'&mobile='+mobile+'&verifycode='+code+'&activity='+id;
			get(url,function(res){
				if(res.code==0){
					this.props.hide();
					this.props.updateZan();
					this.props.showTip('点赞成功，红包已经放入您的账户',2000);
				}
				else{
					this.props.showTip(res.msg,2000);
				}
			}.bind(this))
		}.bind(this);
	}

	componentWillUnmount(){
		clearInterval(this.timer);
	}

	render(){
		var width=document.documentElement.clientWidth;
		var height=document.documentElement.clientHeight;
		if(this.state.canVerify){
			var yz_btn=<div className='modal_btn' onTouchTap={this.getCode}>获取验证码</div>
		}
		else{
			var yz_btn=<div className='modal_btn' style={{background:"#aaa",borderColor:"#aaa",color:"#fff"}}>{this.state.time}s</div>
		}
		if(this.props.needText){
			var intext=<div className='modal_inner'>
						<div className='text_wrap'>
							<div style={{float:'left'}}><input type='text' className='modal_input' placeholder='输入手机号码' value={this.state.mobile} onChange={(e)=>{
								var value=e.nativeEvent.target.value;
								this.setState({
									mobile:value
								})

							}}/></div>
							{yz_btn}
						</div>
						<div className='text_wrap'>
							<div style={{float:'left'}}><input type='text' className='modal_input' placeholder='输入验证码' value={this.state.code} onChange={(e)=>{
								var value=e.nativeEvent.target.value;
								this.setState({
									code:value
								})
							}}/></div>
							<div className='modal_btn' onTouchTap={this.toDz}>提交</div>
						</div>
					</div>
		}

		return (
			<div className='modal' style={{width:width,height:height}} onTouchTap={(e)=>{
				if(e.target.className=='modal'){
					this.props.hide();
				};
				// this.props.hide
			}}>
				{intext}
			</div>
			)
	}
}


class AutumnWechat extends Component{
	constructor(props){
		super(props);
		this.state={
			show:false,
			img_url:'',
			quantity:2,
			thumb_number:3,
			showBrowser:false
		}

		this.id='';
		this.secretuid='';

		this.ids=[];

		this.hide=function(){
			this.setState({
				show:false
			})
		}.bind(this);

		this.updateZan=function(){
			var url='http://activityapi.aidaojia.com/getDoublePartnerData?secretuid='+this.secretuid+'&activity='+this.id;
			get(url,function(res){
				if(res.code==0){
					this.setState({
						quantity:res.data.quantity,
						thumb_number:res.data.thumb_number
					})
				}
				else{
					this.props.showTip(res.msg,2000);
				}

			}.bind(this));
		}.bind(this);
	}

	componentWillMount(){
		this.id=kEnv.getParams.id;
		this.secretuid=kEnv.getParams.secretuid;
		this.setState({
			img_url:id_arr[this.id-1]
		});

		var url='http://activityapi.aidaojia.com/getDoublePartnerData?secretuid='+this.secretuid+'&activity='+this.id;
		get(url,function(res){
			if(res.code==0){
				this.setState({
					quantity:res.data.quantity,
					thumb_number:res.data.thumb_number
				})
				this.ids=res.data.team;
			}
			else{
				this.props.showTip(res.msg,2000);
			}
		}.bind(this))

		if(kEnv.env.weChat){
			kwechat.initWeChat(['onMenuShareTimeline','onMenuShareAppMessage'],function(wx){

				this.onMenuShareTimeline({
					title:'中秋嘉年华！集赞赢翻倍红包！',
					link:location.href,
					imgUrl:'http://gw.aidaojiacdn.com/upload_8ba29d8b803692aa94e31933831c07ad_120x120.png'
				});

				this.onMenuShareAppMessage({
					title:'中秋嘉年华！集赞赢翻倍红包！',
					desc:"你领取专享红包，我获得加倍机会！小伙伴们，快来一起手动点赞啦！",
					link:location.href,
					imgUrl:'http://gw.aidaojiacdn.com/upload_8ba29d8b803692aa94e31933831c07ad_120x120.png'
				})
			})
		}
	}

	componentDidMount(){

		var url='http://activityapi.aidaojia.com/getDoublePartnerData?secretuid='+this.secretuid+'&activity='+this.id;
		get(url,function(res){
			if(res.code==0){
				this.setState({
					quantity:res.data.quantity,
					thumb_number:res.data.thumb_number
				})
				this.ids=res.data.team;

				// for(var i=0;i<this.ids.length;i++){
				// 	var id=this.ids[i];
				// 	console.log(id);

					TMS.requestActone({
						wrap:'#tms_inner',
						data:{
							ids:this.ids[0],
							nochache:0
						},
						mode:"mod3"
					})
				// }


			}
			else{
				this.props.showTip(res.msg,2000);
			}
		}.bind(this))
	}

	render(){
		if(this.state.show && this.state.showBrowser){
			var input_area=<InputArea hide={this.hide} showTip={this.props.showTip} id={this.id} secretuid={this.secretuid}/>;
		}
		else if(this.state.show){
			var input_area=<InputArea hide={this.hide} showTip={this.props.showTip} id={this.id} secretuid={this.secretuid} needText={true} updateZan={this.updateZan}/>;
		}
		return (
			<div>
				<div>
					<img src='http://gw.aidaojiacdn.com/upload_d554c08d20b4707d0a551a71c513b700_750x430.jpg'/>
				</div>
				<div className='dz_wrap'>
					<div className='dz_inner'>
						<img src={this.state.img_url}/>
						<div className='dz_num'>
							{this.state.quantity}/{this.state.thumb_number}
						</div>
						<div className='dzbtn_wrap'>
							<span className='hongbao_btn hongbao_btn2' onTouchTap={()=>{
								this.setState({
									show:true
								})
							}}>为TA点赞&gt;</span>
						</div>
					</div>
				</div>
				<div id='tms_inner'></div>
				<div>
					<img src='http://gw.aidaojiacdn.com/upload_f406d1f1c50f83a15487be4715d6b9cf_750x100.jpg'/>
				</div>
				<div className='zc_wrap'>
					<a href='http://a.app.qq.com/o/simple.jsp?pkgname=com.yidao.aidaojia'><img src='http://gw.aidaojiacdn.com/upload_baa26dd4f0f5d0195fb34a223a6a7e5e_250x170.jpg' className='b_img'/></a>
					<a href='http://a.app.qq.com/o/simple.jsp?pkgname=com.yidao.aidaojia'><img src='http://gw.aidaojiacdn.com/upload_bd85b125588450e29c779237721076d0_250x170.jpg' className='b_img'/></a>
					<a href='http://a.app.qq.com/o/simple.jsp?pkgname=com.yidao.aidaojia'><img src='http://gw.aidaojiacdn.com/upload_91982d1885c3c321c1780d18fb0b0f05_250x170.jpg' className='b_img'/></a>
					<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yidao.aidaojia"><img src='http://gw.aidaojiacdn.com/upload_a983805eb8ab18b6ccd2cb197db37bd8_250x170.jpg' className='b_img'/></a>
					<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yidao.aidaojia"><img src='http://gw.aidaojiacdn.com/upload_52136c5397c3723393857e1f0258e9c6_250x170.jpg' className='b_img'/></a>
					<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yidao.aidaojia"><img src='http://gw.aidaojiacdn.com/upload_d0ed0e98dea3bb549a1c859842efa6e7_250x170.jpg' className='b_img'/></a>
					<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yidao.aidaojia"><img src='http://gw.aidaojiacdn.com/upload_3b71185c94fdd5ff87d087abaac72328_250x170.jpg' className='b_img'/></a>
					<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yidao.aidaojia"><img src='http://gw.aidaojiacdn.com/upload_f34bf0786e35349e2e9fc8aa4a800a6b_250x170.jpg' className='b_img'/></a>
					<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yidao.aidaojia"><img src='http://gw.aidaojiacdn.com/upload_35c868e0d1a1c3771a8bfdea8c7ce7d4_250x170.jpg' className='b_img'/></a>
					<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yidao.aidaojia"><img src='http://gw.aidaojiacdn.com/upload_6f16d47872bff18d787196c9a54c68b4_250x170.jpg' className='b_img'/></a>
					<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yidao.aidaojia"><img src='http://gw.aidaojiacdn.com/upload_e9ecc1094c81f8f1518f7a125397f139_250x170.jpg' className='b_img'/></a>
				</div>
				<div>
					<img src='http://gw.aidaojiacdn.com/upload_d4542f45a919d63f0bde71924c2f7819_750x350.jpg'/>
				</div>
				{input_area}
			</div>
			)
	}
}

var AutumnEnhance=Enhance(AutumnWechat);


render(<AutumnEnhance/>,document.getElementById('wrap'));



































