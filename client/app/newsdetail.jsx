/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-29 10:48:52
 * @version $Id$
 */
import React from 'react'
import {render} from 'react-dom'
import {Enhance} from './lib/enhance.js'

class NewsItem extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>ssdsds</div>
			)
	}
}

var NewsItemEnhance = Enhance(NewsItem);

render(<NewsItemEnhance/>,document.getElementById('wrap'));
