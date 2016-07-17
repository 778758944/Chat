/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-14 21:43:06
 * @version $Id$
 */
import React,{Component} from 'react'
import {Router,Link} from 'react-router'


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
		var path='/chat/'+this.props.id;
		return (
			<div className="friendWrap">
				<Link to={path}><div className="friendText">{this.props.email}</div></Link>
			</div>
			)
	}
}

Friend.contextTypes={
	color:React.PropTypes.string,
	router:React.PropTypes.object
}

export default Friend;









































