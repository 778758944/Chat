import React from "react" ;
import Immutable from "immutable";

let RetinaCom = (ComposedComponent) => class extends React.Component {
    componentWillMount(){
        //retina 0.5px
        if(window.devicePixelRatio && devicePixelRatio >= 2){
            var testElem = document.createElement('div');
            testElem.style.border = '0.5px solid transparent';
            document.body.appendChild(testElem);
            if(testElem.offsetHeight == 1){
                document.querySelector('html').classList.add('hairline');
            }
            document.body.removeChild(testElem);
        }
    }
    render(){
        return <ComposedComponent {...this.props} />;
    }
};
export {RetinaCom}

let ReduceRender = (ComposedComponent) => class extends React.Component{
    shouldComponentUpdate(nextprops,nextstate){
        var props = this.props;
        var state = this.state;
        //console.log(props,nextprops);
        var propsBool = Immutable.is(Immutable.fromJS(props),Immutable.fromJS(nextprops));
        var stateBool =  Immutable.is(Immutable.fromJS(state),Immutable.fromJS(nextstate));
        //console.log(propsBool,stateBool);
        return !propsBool || !stateBool;
    }
    render(){
        return <ComposedComponent {...this.props} />;
    }
};
export {ReduceRender}