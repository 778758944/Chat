webpackJsonp([10,6],{167:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Enhance=void 0;var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},c=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),h=i(1),l=n(h),u=i(168),p=n(u),f=i(173),d=n(f);e.Enhance=function(t,e){return function(i){function n(t){s(this,n);var i=r(this,Object.getPrototypeOf(n).call(this,t));return i.state={data:null,loading:e},i.tip="",i.showTip=function(t,e){this.tip.show(t,e)}.bind(i),i.loaded=function(){this.setState({loading:!1})}.bind(i),i}return o(n,i),c(n,[{key:"componentDidMount",value:function(){console.log("sds")}},{key:"render",value:function(){var e=this;return this.state.loading?l["default"].createElement("div",{style:{width:this.props.width+"px",height:this.props.height+"px"}},l["default"].createElement(d["default"],null),l["default"].createElement(p["default"],{ref:function(t){return e.tip=t}})):l["default"].createElement("div",null,l["default"].createElement(t,a({},this.props,{showTip:this.showTip,loaded:this.loaded})),l["default"].createElement(p["default"],{ref:function(t){return e.tip=t}}))}}]),n}(h.Component)}},168:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),c=i(1),h=n(c),l=i(169),u=function(t){function e(t){s(this,e);var i=r(this,Object.getPrototypeOf(e).call(this,t));return i.state={msg:"message"},i.tip="",i.msg,i.show=function(t,e){this.setState({msg:t});var i=e||2e3;this.tip.style.opacity=1,this.tip.style.bottom="20%",setTimeout(function(){this.tip.style.opacity=0,this.tip.style.bottom="-20%"}.bind(this),i)}.bind(i),i}return o(e,t),a(e,[{key:"render",value:function(){var t=this;return h["default"].createElement("div",{className:l.tipWrap,ref:function(e){return t.tip=e}},h["default"].createElement("div",{className:l.tipInner},h["default"].createElement("span",{className:l.tipMsg},this.state.msg)))}}]),e}(c.Component);u.defaultProps={msg:"hello world"},e["default"]=u},169:function(t,e,i){var n=i(170);"string"==typeof n&&(n=[[t.id,n,""]]);i(172)(n,{});n.locals&&(t.exports=n.locals)},170:function(t,e,i){e=t.exports=i(171)(),e.push([t.id,".EPjvBFLD9aa_WTNHx-Qar{color:red}._2VJa0m1t9YmWlQB92VZQSL{width:80%;padding:20px 10px;background:rgba(0,0,0,.5);overflow:hidden;position:fixed;left:10%;bottom:-20%;text-align:center;border-radius:10px;box-sizing:border-box;opacity:0;-webkit-transition:all .5s ease;transition:all .5s ease}._27R4K3JUqeLzZ203lZknJw{font-size:14px;color:#fff}._26YQV8fwcwtVTLoHOTq9Gw{width:100%;height:100%;display:table;text-align:center;vertical-align:middle}.zaR8Xvi8jwyqACbwWIw6r{display:table-cell;vertical-align:middle;text-align:center}.h2{color:blue}",""]),e.locals={h1:"EPjvBFLD9aa_WTNHx-Qar",tipWrap:"_2VJa0m1t9YmWlQB92VZQSL",tipMsg:"_27R4K3JUqeLzZ203lZknJw",loadingWrap:"_26YQV8fwcwtVTLoHOTq9Gw",loadText:"zaR8Xvi8jwyqACbwWIw6r"}},173:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),c=i(1),h=n(c),l=i(169),u=function(t){function e(t){return s(this,e),r(this,Object.getPrototypeOf(e).call(this,t))}return o(e,t),a(e,[{key:"render",value:function(){return h["default"].createElement("div",{className:l.loadingWrap},h["default"].createElement("div",{className:l.loadText},"loading..."))}}]),e}(c.Component);e["default"]=u},254:function(t,e){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(t){return"function"==typeof t}function s(t){return"number"==typeof t}function r(t){return"object"==typeof t&&null!==t}function o(t){return void 0===t}t.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(t){if(!s(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},i.prototype.emit=function(t){var e,i,s,a,c,h;if(this._events||(this._events={}),"error"===t&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if(e=arguments[1],e instanceof Error)throw e;var l=new Error('Uncaught, unspecified "error" event. ('+e+")");throw l.context=e,l}if(i=this._events[t],o(i))return!1;if(n(i))switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),i.apply(this,a)}else if(r(i))for(a=Array.prototype.slice.call(arguments,1),h=i.slice(),s=h.length,c=0;c<s;c++)h[c].apply(this,a);return!0},i.prototype.addListener=function(t,e){var s;if(!n(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,n(e.listener)?e.listener:e),this._events[t]?r(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,r(this._events[t])&&!this._events[t].warned&&(s=o(this._maxListeners)?i.defaultMaxListeners:this._maxListeners,s&&s>0&&this._events[t].length>s&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace())),this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(t,e){function i(){this.removeListener(t,i),s||(s=!0,e.apply(this,arguments))}if(!n(e))throw TypeError("listener must be a function");var s=!1;return i.listener=e,this.on(t,i),this},i.prototype.removeListener=function(t,e){var i,s,o,a;if(!n(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(i=this._events[t],o=i.length,s=-1,i===e||n(i.listener)&&i.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(r(i)){for(a=o;a-- >0;)if(i[a]===e||i[a].listener&&i[a].listener===e){s=a;break}if(s<0)return this;1===i.length?(i.length=0,delete this._events[t]):i.splice(s,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},i.prototype.removeAllListeners=function(t){var e,i;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(i=this._events[t],n(i))this.removeListener(t,i);else if(i)for(;i.length;)this.removeListener(t,i[i.length-1]);return delete this._events[t],this},i.prototype.listeners=function(t){var e;return e=this._events&&this._events[t]?n(this._events[t])?[this._events[t]]:this._events[t].slice():[]},i.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(n(e))return 1;if(e)return e.length}return 0},i.listenerCount=function(t,e){return t.listenerCount(e)}},256:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AppDispatcher=void 0;var n,s,r,o,a=i(257),c=new a.Dispatcher;c.register(function(t){switch(t.actionType){case"SEND MESSAGE":i.e(3,function(e){n=i(260).MsgStore,n.sendMsg(t.text)});break;case"LOGIN":i.e(4,function(e){s=i(253).LoginStore,s.login(t.email,t.password)});break;case"GET USER":r?r.getUsers(t.token):i.e(5,function(e){r=i(261).FriendStore,r.getUsers(t.token)});break;case"SAVE INFO":i.e(6,function(e){o=i(309).SettingStore,o.save(t.username,t.path)});break;case"SET POINT":r?r.setPoint(t.path):i.e(5,function(e){r=i(261).FriendStore,r.setPoint(t.path)})}}),e.AppDispatcher=c},257:function(t,e,i){t.exports.Dispatcher=i(258)},258:function(t,e,i){(function(n){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.__esModule=!0;var r=i(259),o="ID_",a=function(){function t(){s(this,t),this._callbacks={},this._isDispatching=!1,this._isHandled={},this._isPending={},this._lastID=1}return t.prototype.register=function(t){var e=o+this._lastID++;return this._callbacks[e]=t,e},t.prototype.unregister=function(t){this._callbacks[t]?void 0:"production"!==n.env.NODE_ENV?r(!1,"Dispatcher.unregister(...): `%s` does not map to a registered callback.",t):r(!1),delete this._callbacks[t]},t.prototype.waitFor=function(t){this._isDispatching?void 0:"production"!==n.env.NODE_ENV?r(!1,"Dispatcher.waitFor(...): Must be invoked while dispatching."):r(!1);for(var e=0;e<t.length;e++){var i=t[e];this._isPending[i]?this._isHandled[i]?void 0:"production"!==n.env.NODE_ENV?r(!1,"Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.",i):r(!1):(this._callbacks[i]?void 0:"production"!==n.env.NODE_ENV?r(!1,"Dispatcher.waitFor(...): `%s` does not map to a registered callback.",i):r(!1),this._invokeCallback(i))}},t.prototype.dispatch=function(t){this._isDispatching?"production"!==n.env.NODE_ENV?r(!1,"Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."):r(!1):void 0,this._startDispatching(t);try{for(var e in this._callbacks)this._isPending[e]||this._invokeCallback(e)}finally{this._stopDispatching()}},t.prototype.isDispatching=function(){return this._isDispatching},t.prototype._invokeCallback=function(t){this._isPending[t]=!0,this._callbacks[t](this._pendingPayload),this._isHandled[t]=!0},t.prototype._startDispatching=function(t){for(var e in this._callbacks)this._isPending[e]=!1,this._isHandled[e]=!1;this._pendingPayload=t,this._isDispatching=!0},t.prototype._stopDispatching=function(){delete this._pendingPayload,this._isDispatching=!1},t}();t.exports=a}).call(e,i(4))},259:function(t,e,i){(function(e){"use strict";var i=function(t,i,n,s,r,o,a,c){if("production"!==e.env.NODE_ENV&&void 0===i)throw new Error("invariant requires an error message argument");if(!t){var h;if(void 0===i)h=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,s,r,o,a,c],u=0;h=new Error("Invariant Violation: "+i.replace(/%s/g,function(){return l[u++]}))}throw h.framesToPop=1,h}};t.exports=i}).call(e,i(4))},309:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SettingStore=void 0;var n=i(254),s=Object.assign({},n.EventEmitter.prototype,{users:[],save:function(t,e){var i="/api/yonghus/updateInfo";post(i,{username:t,path:e},function(t){this.emit("get")}.bind(this),function(t){this.emit("fail")}.bind(this),!1)},addFailListener:function(t){this.on("fail",t)},removeFailListener:function(t){this.removeListener("fail",t)},addGetListener:function(t){this.on("get",t)},removeGetListener:function(t){this.removeListener("get",t)},emitGet:function(){this.emit("get")}});e.SettingStore=s},321:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),c=i(1),h=n(c),l=i(322),u=n(l),p=i(309),f=i(167),d=function(t){function e(t){s(this,e);var i=r(this,Object.getPrototypeOf(e).call(this,t));return i.state={name:"",needPic:!1,imgurl:"",imgPath:""},i.onChangeText=function(t){var e=t.target.value;this.setState({name:e})}.bind(i),i.submit=function(){u["default"].save(this.state.name,this.state.imgPath)}.bind(i),i._onChange=function(t){var e=t.target.files[0],i=new FileReader;i.onload=function(t){var e=t.target.result;this.setState({needPic:!0,imgurl:e})}.bind(this),i.readAsDataURL(e)}.bind(i),i.uploaded=function(t){this.setState({needPic:!1,imgPath:t})}.bind(i),i}return o(e,t),a(e,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){u["default"].setPoint(this.props.location.pathname),p.SettingStore.addGetListener(function(){this.props.showTip("success",2e3),this.context.router.goBack()}.bind(this)),p.SettingStore.addFailListener(function(){this.props.showTip("error",2e3)}.bind(this))}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var t;document.documentElement.clientWidth,document.documentElement.clientHeight;return this.state.needPic&&(t=h["default"].createElement(v,{img:this.state.imgurl,bl:1,uploaded:this.uploaded})),h["default"].createElement("div",{className:"warp"},t,h["default"].createElement("form",{id:"from1"},h["default"].createElement("div",null,h["default"].createElement("span",null,"头像:"),h["default"].createElement("input",{type:"file",name:"tx",onChange:this._onChange})),h["default"].createElement("div",null,h["default"].createElement("span",null,"昵称:"),h["default"].createElement("input",{type:"text",name:"username",onChange:this.onChangeText,value:this.state.name}),h["default"].createElement("input",{type:"hidden",name:"imgPath",value:this.state.imgPath}))),h["default"].createElement("button",{onClick:this.submit},"保存"))}}]),e}(c.Component),v=function(t){function e(t){s(this,e);var i=r(this,Object.getPrototypeOf(e).call(this,t));return i.state={img:"",width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,showImg:!0,cvsHeight:0,cvsWidth:0},i.cvs="",i.ctx="",i.top=0,i.rect="",i}return o(e,t),a(e,[{key:"componentDidMount",value:function(){var t=(new m(this.ctx,this.cvs,100,100),new Image);t.onload=function(){var e=this.state.width/t.width*t.height,i=this.state.width/this.props.bl;if(i<e)this.top=(this.state.height-i)/2,this.rect=new m(this.ctx,this.cvs,this.state.width,i,0,this.top,1,t,e);else{this.top=(this.state.height-e)/2;var n=e*this.props.bl;this.rect=new m(this.ctx,this.cvs,n,e,0,this.top,2,t)}}.bind(this),t.src=this.props.img}},{key:"render",value:function(){var t=this;if(this.state.showImg)var e=h["default"].createElement("img",{src:this.props.img,style:{width:this.state.width,verticalAlign:"middle"}});return h["default"].createElement("div",{style:{width:this.state.width,height:this.state.height,top:0,left:0,display:"table-cell",verticalAlign:"middle"}},e,h["default"].createElement("canvas",{ref:function(e){t.cvs||(t.cvs=e,t.ctx=e.getContext("2d"))},width:this.state.width,height:this.state.height,style:{position:"absolute",left:0,top:0}}),h["default"].createElement("button",{style:{position:"absolute",top:0,left:0},onClick:function(){var e=t.rect.getImage();post("/api/uploadImg",{data:e},function(t){this.props.uploaded(t.path)}.bind(t))}},"确定"))}}]),e}(h["default"].Component),m=function(){function t(e,i,n,r,o,a,c,h,l){s(this,t),this.ctx=e,this.width=n,this.height=r,this.cvs=i,this.posx=o,this.posy=a,this.type=c,this.img=h,this.img_h=l,e.save(),e.fillStyle="rgba(0,0,0,0.5)",e.fillRect(0,0,this.cvs.width,this.cvs.height),e.restore(),e.save(),e.globalCompositeOperation="destination-out",e.fillRect(this.posx,this.posy,this.width,this.height),e.restore();var u,p,f=!1;this.cvs.addEventListener("touchstart",function(t){t.touches[0];u=t.touches[0].clientX,p=t.touches[0].clientY;var e=u>this.posx&&u<this.posx+this.width,i=p>this.posy&&p<this.posy+this.height;e&&i&&(f=!0)}.bind(this)),this.cvs.addEventListener("touchmove",function(t){if(f){var e=t.touches[0].clientX,i=t.touches[0].clientY,n=e-u,s=i-p,r=this.posx+n,o=this.posy+s;if(1==this.type){var a=(this.cvs.height-this.img_h)/2,c=o>a&&o+this.height<this.cvs.height-a;c&&(this.posy=o,p=i,this.move(this.posx,this.posy))}else{var c=r>0&&r+this.width<this.cvs.width;c&&(this.posx=r,u=e,this.move(this.posx,this.posy))}}}.bind(this)),this.cvs.addEventListener("touchend",function(t){f=!1})}return a(t,[{key:"move",value:function(t,e){var i=this.cvs.width,n=this.cvs.height,s=this.ctx;s.clearRect(0,0,i,n),s.save(),s.fillStyle="rgba(0,0,0,0.5)",s.fillRect(0,0,i,n),s.restore(),s.save(),s.globalCompositeOperation="destination-out",s.fillStyle="#f00",s.fillRect(t,e,this.width,this.height),s.restore()}},{key:"getImage",value:function(){var t=document.createElement("canvas");t.width=this.width,t.height=this.height;var e=t.getContext("2d");if(2==this.type)e.drawImage(this.img,-this.posx,0,this.cvs.width,this.height);else{var i=(this.cvs.height-this.img_h)/2-this.posy;e.drawImage(this.img,0,i,this.cvs.width,this.img_h)}var n=t.toDataURL();return n.substr(22)}}]),t}();d.contextTypes={router:h["default"].PropTypes.object,state:h["default"].PropTypes.object},d=(0,f.Enhance)(d),t.exports=d},322:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(256),s={save:function(t,e){n.AppDispatcher.dispatch({actionType:"SAVE INFO",username:t,path:e})},setPoint:function(t){n.AppDispatcher.dispatch({actionType:"SET POINT",path:t})}};e["default"]=s}});