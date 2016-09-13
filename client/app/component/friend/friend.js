/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-14 21:43:06
 * @version $Id$
 */
import React,{Component} from 'react'
import {Router,Link} from 'react-router'

var img=require('../../11.png');


class Friend extends Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		// console.log(this.props.location);
	}

	componentDidMount(){
		// console.log(this.context);
		// console.log(this.router);
	}

	render(){
		var path=this.props.path;
		if(!path){
			path='/chat/'+this.props.id;
		}
		return (
			<div className="friendWrap">
				<Link to={{
					pathname:path,
					state:{
						other_img:this.props.img ? this.props.img:img,
						mine_img:this.props.myimg ? this.props.myimg:img
					}
				}}>
					<div style={{display:'inline-block',marginTop:"5px",position:"relative"}}>
						<img src={this.props.img ? this.props.img:img} className='tx'/>
						<span className='notice_tip'>2</span>
					</div>
					<div className="friendText">{this.props.email}</div>
				</Link>
			</div>
			)
	}
}


Friend.contextTypes={
	color:React.PropTypes.string,
	router:React.PropTypes.object
}

export default Friend;









































