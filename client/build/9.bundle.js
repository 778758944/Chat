webpackJsonp([9],{

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AppDispatcher = undefined;

	var _flux = __webpack_require__(235);

	var MsgStore, LoginStore, FriendStore, SettingStore; /**
	                                                      * 
	                                                      * @authors Your Name (you@example.org)
	                                                      * @date    2016-03-23 22:14:17
	                                                      * @version $Id$
	                                                      */


	var AppDispatcher = new _flux.Dispatcher();
	AppDispatcher.register(function (actions) {
		switch (actions.actionType) {
			case 'SEND MESSAGE':
				__webpack_require__.e/* nsure */(2, function (require) {
					MsgStore = __webpack_require__(238).MsgStore;
					MsgStore.sendMsg(actions.text);
				});
				break;

			case 'LOGIN':
				__webpack_require__.e/* nsure */(3, function (require) {
					LoginStore = __webpack_require__(231).LoginStore;
					LoginStore.login(actions.email, actions.password);
				});
				break;

			case 'GET USER':
				if (FriendStore) {
					FriendStore.getUsers(actions.token);
				} else {
					__webpack_require__.e/* nsure */(4, function (require) {
						FriendStore = __webpack_require__(239).FriendStore;
						FriendStore.getUsers(actions.token);
					});
				}
				break;

			case 'SAVE INFO':
				__webpack_require__.e/* nsure */(5, function (require) {
					SettingStore = __webpack_require__(287).SettingStore;
					SettingStore.save(actions.username, actions.path);
				});
				break;

			case 'SET POINT':
				if (FriendStore) {
					FriendStore.setPoint(actions.path);
				} else {
					__webpack_require__.e/* nsure */(4/* duplicate */, function (require) {
						FriendStore = __webpack_require__(239).FriendStore;
						FriendStore.setPoint(actions.path);
					});
				}
				break;

			default:
		}
	});

	exports.AppDispatcher = AppDispatcher;

/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(236);


/***/ },

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var invariant = __webpack_require__(237);

	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	var Dispatcher = (function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);

	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */

	  Dispatcher.prototype.register = function register(callback) {
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   */

	  Dispatcher.prototype.unregister = function unregister(id) {
	    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */

	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   */

	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   */

	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };

	  return Dispatcher;
	})();

	module.exports = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function (condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _SettingAction = __webpack_require__(300);

	var _SettingAction2 = _interopRequireDefault(_SettingAction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @authors Your Name (you@example.org)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date    2016-07-30 14:37:11
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version $Id$
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var SettingCtrl = function (_Component) {
		_inherits(SettingCtrl, _Component);

		function SettingCtrl(props) {
			_classCallCheck(this, SettingCtrl);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SettingCtrl).call(this, props));

			_this.state = {
				name: '',
				needPic: false,
				imgurl: '',
				imgPath: ''
			};

			_this.onChangeText = function (e) {
				var value = e.target.value;
				this.setState({
					name: value
				});
			}.bind(_this);

			_this.submit = function () {
				_SettingAction2.default.save(this.state.name, this.state.imgPath);
			}.bind(_this);

			_this._onChange = function (e) {
				var file = e.target.files[0];
				var fileReader = new FileReader();

				fileReader.onload = function (e) {
					var img = e.target.result;
					this.setState({
						needPic: true,
						imgurl: img
					});
				}.bind(this);

				fileReader.readAsDataURL(file);
			}.bind(_this);

			_this.uploaded = function (path) {
				this.setState({
					needPic: false,
					imgPath: path
				});
			}.bind(_this);

			return _this;
		}

		_createClass(SettingCtrl, [{
			key: 'componentWillMount',
			value: function componentWillMount() {}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				_SettingAction2.default.setPoint(this.props.location.pathname);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {}
		}, {
			key: 'render',
			value: function render() {
				var pic;
				var width = document.documentElement.clientWidth;
				var height = document.documentElement.clientHeight;
				if (this.state.needPic) {
					pic = _react2.default.createElement(DealPic, { img: this.state.imgurl, bl: 1, uploaded: this.uploaded });
				}
				return _react2.default.createElement(
					'div',
					{ className: 'warp' },
					pic,
					_react2.default.createElement(
						'form',
						{ id: 'from1' },
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'span',
								null,
								'头像:'
							),
							_react2.default.createElement('input', { type: 'file', name: 'tx', onChange: this._onChange })
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'span',
								null,
								'昵称:'
							),
							_react2.default.createElement('input', { type: 'text', name: 'username', onChange: this.onChangeText, value: this.state.name }),
							_react2.default.createElement('input', { type: 'hidden', name: 'imgPath', value: this.state.imgPath })
						)
					),
					_react2.default.createElement(
						'button',
						{ onClick: this.submit },
						'保存'
					)
				);
			}
		}]);

		return SettingCtrl;
	}(_react.Component);

	var DealPic = function (_React$Component) {
		_inherits(DealPic, _React$Component);

		function DealPic(props) {
			_classCallCheck(this, DealPic);

			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(DealPic).call(this, props));

			_this2.state = {
				img: '',
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight,
				showImg: true,
				cvsHeight: 0,
				cvsWidth: 0
			};

			_this2.cvs = '';
			_this2.ctx = '';
			_this2.top = 0;
			_this2.rect = '';
			return _this2;
		}

		_createClass(DealPic, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var rect = new Select(this.ctx, this.cvs, 100, 100);
				var img = new Image();

				img.onload = function () {
					var c_height = this.state.width / img.width * img.height;

					var cvs_height = this.state.width / this.props.bl;

					if (cvs_height < c_height) {
						this.top = (this.state.height - cvs_height) / 2;
						this.rect = new Select(this.ctx, this.cvs, this.state.width, cvs_height, 0, this.top, 1, img, c_height);
					} else {
						this.top = (this.state.height - c_height) / 2;
						var cvs_width = c_height * this.props.bl;
						this.rect = new Select(this.ctx, this.cvs, cvs_width, c_height, 0, this.top, 2, img);
					}
				}.bind(this);

				img.src = this.props.img;
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				if (this.state.showImg) {
					var img = _react2.default.createElement('img', { src: this.props.img, style: { width: this.state.width, verticalAlign: "middle" } });
				}

				return _react2.default.createElement(
					'div',
					{ style: {
							width: this.state.width,
							height: this.state.height,
							// position:"absolute",
							top: 0,
							left: 0,
							display: 'table-cell',
							verticalAlign: "middle"
						} },
					img,
					_react2.default.createElement('canvas', { ref: function ref(e) {
							if (!_this3.cvs) {
								_this3.cvs = e;
								_this3.ctx = e.getContext('2d');
							}
						}, width: this.state.width, height: this.state.height, style: {
							position: 'absolute',
							left: 0,
							top: 0
						} }),
					_react2.default.createElement(
						'button',
						{ style: { position: "absolute", top: 0, left: 0 }, onClick: function onClick() {
								var data = _this3.rect.getImage();
								post('/api/uploadImg', { data: data }, function (res) {
									this.props.uploaded(res.path);
								}.bind(_this3));
							} },
						'确定'
					)
				);
			}
		}]);

		return DealPic;
	}(_react2.default.Component);

	var Select = function () {
		function Select(ctx, cvs, width, height, x, y, type, img, img_h) {
			_classCallCheck(this, Select);

			this.ctx = ctx;
			this.width = width;
			this.height = height;
			this.cvs = cvs;
			this.posx = x;
			this.posy = y;
			this.type = type;
			this.img = img;
			this.img_h = img_h;
			ctx.save();
			ctx.fillStyle = 'rgba(0,0,0,0.5)';
			ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
			ctx.restore();

			ctx.save();
			ctx.globalCompositeOperation = "destination-out";
			ctx.fillRect(this.posx, this.posy, this.width, this.height);
			ctx.restore();

			var startX,
			    startY,
			    canDrag = false;

			this.cvs.addEventListener('touchstart', function (e) {
				var touch = e.touches[0];
				startX = e.touches[0].clientX;
				startY = e.touches[0].clientY;
				var if1 = startX > this.posx && startX < this.posx + this.width;
				var if2 = startY > this.posy && startY < this.posy + this.height;
				if (if1 && if2) {
					canDrag = true;
				}
			}.bind(this));

			this.cvs.addEventListener('touchmove', function (e) {
				if (canDrag) {
					var endx = e.touches[0].clientX;
					var endy = e.touches[0].clientY;

					var disx = endx - startX;
					var disy = endy - startY;

					var fx = this.posx + disx;
					var fy = this.posy + disy;

					if (this.type == 1) {

						var ch = (this.cvs.height - this.img_h) / 2;
						var if1 = fy > ch && fy + this.height < this.cvs.height - ch;
						// this.posx=fx;
						if (if1) {
							this.posy = fy;
							// startX=endx;
							startY = endy;
							this.move(this.posx, this.posy);
						}
					} else {
						var if1 = fx > 0 && fx + this.width < this.cvs.width;
						if (if1) {
							this.posx = fx;
							startX = endx;
							this.move(this.posx, this.posy);
						}
					}
				}
			}.bind(this));

			this.cvs.addEventListener('touchend', function (e) {
				canDrag = false;
			});
		}

		_createClass(Select, [{
			key: 'move',
			value: function move(x, y) {
				var width = this.cvs.width;
				var height = this.cvs.height;
				var ctx = this.ctx;
				ctx.clearRect(0, 0, width, height);
				ctx.save();
				ctx.fillStyle = 'rgba(0,0,0,0.5)';
				ctx.fillRect(0, 0, width, height);
				ctx.restore();
				ctx.save();
				ctx.globalCompositeOperation = "destination-out";
				ctx.fillStyle = '#f00';
				ctx.fillRect(x, y, this.width, this.height);
				ctx.restore();
			}
		}, {
			key: 'getImage',
			value: function getImage() {
				var cvs = document.createElement('canvas');
				cvs.width = this.width;
				cvs.height = this.height;
				var ctx = cvs.getContext('2d');
				if (this.type == 2) {
					ctx.drawImage(this.img, -this.posx, 0, this.cvs.width, this.height);
				} else {
					var ch = (this.cvs.height - this.img_h) / 2 - this.posy;
					ctx.drawImage(this.img, 0, ch, this.cvs.width, this.img_h);
				}
				var data = cvs.toDataURL();
				return data.substr(22);
			}
		}]);

		return Select;
	}();

	SettingCtrl.contextTypes = {
		router: _react2.default.PropTypes.object,
		state: _react2.default.PropTypes.object
	};
	module.exports = SettingCtrl;

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _AppDispatcher = __webpack_require__(234);

	var SettingAction = {
		save: function save(username, path) {
			// console.log("kk");
			_AppDispatcher.AppDispatcher.dispatch({
				actionType: 'SAVE INFO',
				username: username,
				path: path
			});
		},
		setPoint: function setPoint(path) {
			_AppDispatcher.AppDispatcher.dispatch({
				actionType: "SET POINT",
				path: path
			});
		}
	}; /**
	    * 
	    * @authors Your Name (you@example.org)
	    * @date    2016-07-30 15:34:48
	    * @version $Id$
	    */


	exports.default = SettingAction;

/***/ }

});