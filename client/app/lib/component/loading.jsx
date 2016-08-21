/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-19 15:48:09
 * @version $Id$
 */
import React,{Component} from 'react'
var style=require('./component.scss');


class Loading extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className={style.loadingWrap}>
				<div className={style.loadText}>loading...</div>
			</div>
			)
	}
}

export default Loading
