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

TMS.requestActone({
	wrap:'ddd',
	data:{
		ids:736,
		nocache:0
	},
	resCallback:function(res){
		console.log(res);
	},
	mode:"mod3"
})

// console.log(data);





require('./reset.css');
require('./autumn.css');
injectTapEventPlugin();

var img_arr=[
	{
		left:'http://gw.aidaojiacdn.com/upload_94f17676a5eaaab174c65541f856adfe_750x208.jpg',
		small:'http://gw.aidaojiacdn.com/upload_55f4c3698522c5b197e5de0ae1e95431_172x152.png',
		big:'http://gw.aidaojiacdn.com/upload_0db4b74dc78814362d3f071a42ff7a97_172x152.png',
		big_no:'http://gw.aidaojiacdn.com/upload_20ee42e6f705f5fd533e85e20a9fd261_172x152.png'
	},
	{
		left:'http://gw.aidaojiacdn.com/upload_20ee42e6f705f5fd533e85e20a9fd261_172x152.png',
		small:"http://gw.aidaojiacdn.com/upload_733ba7828f90c4f1353a6ba158c6096e_172x152.png",
		big:'http://gw.aidaojiacdn.com/upload_332317c44eadf4752367beab5a675dfd_172x152.png',
		big_no:'http://gw.aidaojiacdn.com/upload_f31bd46fc8636c358eebbcbf0aad589e_172x152.png'
	},
	{

	}
]

class Gethongbao extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className='hongbaoWrap'>
				<img src='http://gw.aidaojiacdn.com/upload_a303bceb26016609e94157cacc7d3b2e_750x270.jpg'/>
				<div className='hongbaoInner'>
					<img src='http://gw.aidaojiacdn.com/upload_733ba7828f90c4f1353a6ba158c6096e_172x152.png' className='hongbao'/>
					<img src='http://gw.aidaojiacdn.com/upload_332317c44eadf4752367beab5a675dfd_172x152.png' className='hongbao'/>
					<div className='hongbao_get dzbtn_wrap'>
						<span className='hongbao_btn'>为TA点赞</span>
					</div>
				</div>
			</div>
			)
	}
}



class Autumn extends Component{
	constructor(props){
		super(props);
		this.state={
			lastDay:0
		}
	}

	componentDidMount(){
		var date=new Date().getTime();
		var autumn_date=new Date(2016,8,15).getTime();
		var day=Math.floor((autumn_date-date)/(24*3600*1000));
		this.setState({
			lastDay:day
		})

	}

	render(){
		return (
			<div>
				<div>
					<img src='http://gw.aidaojiacdn.com/upload_e3f2c93ece9766156ef8643fd95a352d_750x217.jpg'/>
					<img src='http://gw.aidaojiacdn.com/upload_3253191937faf990a566aa26ef6d0067_750x216.jpg'/>
					<img src='http://gw.aidaojiacdn.com/upload_ffc0039bc47150118bb9e6e6d7d6e074_750x217.jpg'/>
				</div>
				<div className='toAutumn'>
					<p className='toAutumnText'>距离中秋节还有{this.state.lastDay}天</p>
				</div>
				<div>
					<img src='http://gw.aidaojiacdn.com/upload_0a07b5964f6ab11bc31d255575294c57_750x100.jpg'/>
				</div>
				<div>
					<Gethongbao/>
				</div>
				<div>
					<img src='http://gw.aidaojiacdn.com/upload_3902a83df8f8d10fa1f2f9d9a0a43609_750x100.jpg'/>
				</div>
				<div>
					<a href=''>
						<img src='http://gw.aidaojiacdn.com/upload_9deb3cf4b5620b9bd4b2872edc131c4a_750x208.jpg'/>
					</a>
					<a href=''>
						<img src='http://gw.aidaojiacdn.com/upload_ce4da819a9be6159751ea84e7643a173_750x208.jpg'/>
					</a>
					<a href=''>
						<img src='http://gw.aidaojiacdn.com/upload_ce4da819a9be6159751ea84e7643a173_750x208.jpg'/>
					</a>
					<a href=''>
						<img src='http://gw.aidaojiacdn.com/upload_b08a876d56386d45bc9393e64c2203f7_750x208.jpg'/>
					</a>
					<a href=''>
						<img src='http://gw.aidaojiacdn.com/upload_74d71730d0224f52d7a8546523f2bfb5_750x208.jpg'/>
					</a>
					<a href=''>
						<img src='http://gw.aidaojiacdn.com/upload_9fb365c31386bb98f61502e24d5f6eaf_750x208.jpg'/>
					</a>
					<a href=''>
						<img src='http://gw.aidaojiacdn.com/upload_e4e2dc31bf482e5edfd7eebcc25aabfb_750x208.jpg'/>
					</a>
					<a href=''>
						<img src='http://gw.aidaojiacdn.com/upload_1e98c7e9b3c42b98ad306c68b4031df7_750x208.jpg'/>
					</a>
					<a href=''>
						<img src='http://gw.aidaojiacdn.com/upload_a26d99788fe05d38aad4eb7133faaf57_750x208.jpg'/>
					</a>
					<a href=''>
						<img src='http://gw.aidaojiacdn.com/upload_6fe6f4d5dae360d6d73d8c1d5ee40ba0_750x208.jpg'/>
					</a>
					<a href=''>
						<img src='http://gw.aidaojiacdn.com/upload_94f17676a5eaaab174c65541f856adfe_750x208.jpg'/>
					</a>
				</div>
				<div>
					<a href='http://www.baidu.com'><img className='b_img' src='http://gw.aidaojiacdn.com/upload_b466d8f314123698b7ed8cd4598ff786_250x228.jpg'/></a>
					<a href='http://www.zhihu.com'><img className='b_img' src='http://gw.aidaojiacdn.com/upload_98b84ab05cc3a5e34b489e1ba23c0b85_250x228.jpg'/></a>
					<a href='http://www.sina.com'><img className='b_img' src='http://gw.aidaojiacdn.com/upload_23f64bcd30bc0c43ff9d928bf44fafe0_250x228.jpg'/></a>
				</div>
			</div>
			)
	}
}

var AutumnEnhance=Enhance(Autumn);
// var width=document.documentElement.clientWidth;
// var height=document.documentElement.clientHeight;

// console.log(width,height);


render(<AutumnEnhance/>,document.getElementById('wrap'));




































