/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-19 14:36:19
 * @version $Id$
 */
import React,{Component} from 'react'
import Tip from './component/tip.jsx'
import Loading from './component/loading.jsx'

export var Enhance=(ComposedComponent,needLoading) => class extends Component {

	constructor(props){
		super(props);
		this.state={
			data:null,
			loading:needLoading
		}
		this.tip='';
		this.showTip=function(msg,time){
			this.tip.show(msg,time);
		}.bind(this)

		this.loaded=function(){
			this.setState({
				loading:false
			})
		}.bind(this)
	}

	componentDidMount(){
		console.log('sds');
	}

	render(){
		if(this.state.loading){
			return (
				<div style={{width:this.props.width+'px',height:this.props.height+'px'}}>
					<Loading/>
					<Tip ref={(e)=>this.tip=e}/>
				</div>
				)
		}
		else{
			return (
				<div>
					<ComposedComponent {...this.props} showTip={this.showTip} loaded={this.loaded}/>
					<Tip ref={(e)=>this.tip=e}/>
				</div>
			)
		}
	}
}



































