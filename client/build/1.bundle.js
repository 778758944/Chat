webpackJsonp([1,3],{223:function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),c=i(1),u=n(c),l=i(224),h=i(226),f=i(228),p=(i(159),function(e){function t(e){s(this,t);var i=r(this,Object.getPrototypeOf(t).call(this,e));return i.state={email:"778758944@qq.com",password:"123456"},i.changeEmail=function(e){this.setState({email:e.target.value})}.bind(i),i.rel="",i.changePasswd=function(e){this.setState({password:e.target.value})}.bind(i),i.submit=function(e){console.log("sdsd"),f.LoginAction.toLogin(this.state.email,this.state.password)}.bind(i),i}return o(t,e),a(t,[{key:"componentDidMount",value:function(){var e=this.context.router;h.LoginStore.addLoginHandle(function(t){console.log(t),t.id&&e.push({pathname:"/friend",state:{token:t.id,id:t.userId}})})}},{key:"render",value:function(){var e=this;return u["default"].createElement(l.Register,{email:this.state.email,password:this.state.password,changeEmail:this.changeEmail,changePasswd:this.changePasswd,submit:this.submit,ref:function(t){e.ref=t}})}}]),t}(u["default"].Component));p.contextTypes={router:u["default"].PropTypes.object},e.exports=p},224:function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Register=void 0;var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),c=i(1),u=n(c),l=(i(225),function(e){function t(e){s(this,t);var i=r(this,Object.getPrototypeOf(t).call(this,e));return i.state={nana:"wrong"},i.getName=function(){console.log("nana"),this.setState({nana:"right"})},i}return o(t,e),a(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return u["default"].createElement("div",{className:"wrap"},u["default"].createElement("div",{className:"input_area"},u["default"].createElement("form",{id:"form1"},u["default"].createElement("div",{className:"input_area_line"},u["default"].createElement("input",{type:"text",name:"email",placeholder:"请输入您的邮箱",value:this.props.email,onChange:this.props.changeEmail})),u["default"].createElement("div",{className:"input_area_line"},u["default"].createElement("input",{type:"password",name:"password",placeholder:"请输入您的密码",value:this.props.password,onChange:this.props.changePasswd}))),u["default"].createElement("button",{className:"btn",id:"register",onTouchTap:this.props.submit},"登录")))}}]),t}(u["default"].Component));t.Register=l},225:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(e,t,i){this.ipt="Object"==typeof e?e:document.getElementsByName(e)[0],this.type=t,this.actionRight=i||!1},n=function(e,t,i,n,s){var r=this;this.config=e,this.result_ok,this.result=[],this.rightfn=n,this.errorfn=s,this.noRightAction=i||!1,this.form="Object"==typeof t?t:document.getElementById(t);for(var o=this,a=function(e){r.config[e].ipt.addEventListener("change",function(t){o.validate(o.config[e].ipt,e)},!1)},c=0;c<this.config.length;c++)a(c);var u="FORM"==this.form.tagName?"submit":"mousedown";this.form.addEventListener(u,function(e){for(var t=0;t<o.config.length;t++)o.validate(o.config[t].ipt,t)},!1)};n.prototype={validate:function(e,t){var i=this.config[t].type;"string"==typeof i?(this.result_ok=n.types[i](e.value),this.result_ok.isTrue?this.result_ok.isTrue&&this.config[t].actionRight&&this.rightfn(e,this.result_ok):(this.errorfn(e,this.result_ok),this.config[t].actionRight=!0)):(this.result_ok=this.config[t].type.call(this,e.value),this.result_ok&&(this.result_ok.isTrue?this.result_ok.isTrue&&this.config[t].actionRight&&this.rightfn(e,this.result_ok):(this.errorfn(e,this.result_ok),this.config[t].actionRight=!0)))}},n.types=function(){var e=function(e,t){return e?{isTrue:!0}:{isTrue:!1,info:"该选项不能为空"}},t=function(e){var t=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;parseInt(e,10);return t.test(e)?{isTrue:!0}:{isTrue:!1,info:"请输入正确的电话号码"}},i=function(e){return e?isNaN(e)?{isTrue:!1,info:"请输入数字"}:{isTrue:!0}:{isTrue:!1,info:"请输入数字"}},n=function(e,t){if(!e)return{isTrue:!1,info:"该选项不能为空"};for(var i=(t.length,0);i<t.length;i++)if(e==t[i])return{isTrue:!1,info:"该选项不能重复"};return{isTrue:!0}},s=function(e,t){if(!e)return{isTrue:!1,info:"该选项不能为空"};var i=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;return i.test(e)?{isTrue:!0,info:"邮箱填写正确"}:{isTrue:!1,info:"请输入正确的邮箱地址"}};return{isEmpty:e,isTel:t,isNumber:i,isRepeat:n,isEmail:s}}(),t.Config=i,t.Validator=n},226:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LoginStore=void 0;var n=i(227),s=Object.assign({},n.EventEmitter.prototype,{login:function(e,t){post("/api/yonghus/login",{email:e,password:t},function(e){this.emit("tologin",e),console.log("key",key),post("/api/pushkeys/addkey",{key:JSON.stringify(key)},function(e){console.log(e)})}.bind(this))},addLoginHandle:function(e){this.on("tologin",e)}});t.LoginStore=s},227:function(e,t){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(e){return"function"==typeof e}function s(e){return"number"==typeof e}function r(e){return"object"==typeof e&&null!==e}function o(e){return void 0===e}e.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(e){if(!s(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},i.prototype.emit=function(e){var t,i,s,a,c,u;if(this._events||(this._events={}),"error"===e&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var l=new Error('Uncaught, unspecified "error" event. ('+t+")");throw l.context=t,l}if(i=this._events[e],o(i))return!1;if(n(i))switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),i.apply(this,a)}else if(r(i))for(a=Array.prototype.slice.call(arguments,1),u=i.slice(),s=u.length,c=0;c<s;c++)u[c].apply(this,a);return!0},i.prototype.addListener=function(e,t){var s;if(!n(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,n(t.listener)?t.listener:t),this._events[e]?r(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,r(this._events[e])&&!this._events[e].warned&&(s=o(this._maxListeners)?i.defaultMaxListeners:this._maxListeners,s&&s>0&&this._events[e].length>s&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(e,t){function i(){this.removeListener(e,i),s||(s=!0,t.apply(this,arguments))}if(!n(t))throw TypeError("listener must be a function");var s=!1;return i.listener=t,this.on(e,i),this},i.prototype.removeListener=function(e,t){var i,s,o,a;if(!n(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(i=this._events[e],o=i.length,s=-1,i===t||n(i.listener)&&i.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(r(i)){for(a=o;a-- >0;)if(i[a]===t||i[a].listener&&i[a].listener===t){s=a;break}if(s<0)return this;1===i.length?(i.length=0,delete this._events[e]):i.splice(s,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},i.prototype.removeAllListeners=function(e){var t,i;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(i=this._events[e],n(i))this.removeListener(e,i);else if(i)for(;i.length;)this.removeListener(e,i[i.length-1]);return delete this._events[e],this},i.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?n(this._events[e])?[this._events[e]]:this._events[e].slice():[]},i.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(n(t))return 1;if(t)return t.length}return 0},i.listenerCount=function(e,t){return e.listenerCount(t)}},228:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LoginAction=void 0;var n=i(229),s={toLogin:function(e,t){n.AppDispatcher.dispatch({actionType:"LOGIN",email:e,password:t})}};t.LoginAction=s},229:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AppDispatcher=void 0;var n,s,r,o,a=i(230),c=new a.Dispatcher;c.register(function(e){switch(e.actionType){case"SEND MESSAGE":i.e(2,function(t){n=i(233).MsgStore,n.sendMsg(e.text)});break;case"LOGIN":i.e(3,function(t){s=i(226).LoginStore,s.login(e.email,e.password)});break;case"GET USER":r?r.getUsers(e.token):i.e(4,function(t){r=i(234).FriendStore,r.getUsers(e.token)});break;case"SAVE INFO":i.e(5,function(t){o=i(282).SettingStore,o.save(e.username,e.path)});break;case"SET POINT":r?r.setPoint(e.path):i.e(4,function(t){r=i(234).FriendStore,r.setPoint(e.path)})}}),t.AppDispatcher=c},230:function(e,t,i){e.exports.Dispatcher=i(231)},231:function(e,t,i){(function(n){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var r=i(232),o="ID_",a=function(){function e(){s(this,e),this._callbacks={},this._isDispatching=!1,this._isHandled={},this._isPending={},this._lastID=1}return e.prototype.register=function(e){var t=o+this._lastID++;return this._callbacks[t]=e,t},e.prototype.unregister=function(e){this._callbacks[e]?void 0:"production"!==n.env.NODE_ENV?r(!1,"Dispatcher.unregister(...): `%s` does not map to a registered callback.",e):r(!1),delete this._callbacks[e]},e.prototype.waitFor=function(e){this._isDispatching?void 0:"production"!==n.env.NODE_ENV?r(!1,"Dispatcher.waitFor(...): Must be invoked while dispatching."):r(!1);for(var t=0;t<e.length;t++){var i=e[t];this._isPending[i]?this._isHandled[i]?void 0:"production"!==n.env.NODE_ENV?r(!1,"Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.",i):r(!1):(this._callbacks[i]?void 0:"production"!==n.env.NODE_ENV?r(!1,"Dispatcher.waitFor(...): `%s` does not map to a registered callback.",i):r(!1),this._invokeCallback(i))}},e.prototype.dispatch=function(e){this._isDispatching?"production"!==n.env.NODE_ENV?r(!1,"Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."):r(!1):void 0,this._startDispatching(e);try{for(var t in this._callbacks)this._isPending[t]||this._invokeCallback(t)}finally{this._stopDispatching()}},e.prototype.isDispatching=function(){return this._isDispatching},e.prototype._invokeCallback=function(e){this._isPending[e]=!0,this._callbacks[e](this._pendingPayload),this._isHandled[e]=!0},e.prototype._startDispatching=function(e){for(var t in this._callbacks)this._isPending[t]=!1,this._isHandled[t]=!1;this._pendingPayload=e,this._isDispatching=!0},e.prototype._stopDispatching=function(){delete this._pendingPayload,this._isDispatching=!1},e}();e.exports=a}).call(t,i(4))},232:function(e,t,i){(function(t){"use strict";var i=function(e,i,n,s,r,o,a,c){if("production"!==t.env.NODE_ENV&&void 0===i)throw new Error("invariant requires an error message argument");if(!e){var u;if(void 0===i)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,s,r,o,a,c],h=0;u=new Error("Invariant Violation: "+i.replace(/%s/g,function(){return l[h++]}))}throw u.framesToPop=1,u}};e.exports=i}).call(t,i(4))}});