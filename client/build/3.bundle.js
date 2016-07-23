webpackJsonp([3],{

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.LoginStore = undefined;

	var _events = __webpack_require__(232);

	var LoginStore = Object.assign({}, _events.EventEmitter.prototype, {
		login: function login(email, password) {
			post('/api/yonghus/login', {
				email: email,
				password: password
			}, function (res) {
				this.emit('tologin', res);
			}.bind(this));
		},

		addLoginHandle: function addLoginHandle(callback) {
			this.on('tologin', callback);
		}
	}); /**
	     * 
	     * @authors Your Name (you@example.org)
	     * @date    2016-05-02 21:48:32
	     * @version $Id$
	     */


	exports.LoginStore = LoginStore;

/***/ }

});