/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-03 17:46:06
 * @version $Id$
 */



var app=[
	{
		path:"/register",
		getComponent(nextState,cb){
			require.ensure([],function(require){
				cb(null,require('./register/registerCtrl'));
			})
		}
	},
	{
		path:'chat/:id',
		getComponent(nextState,cb){
			require.ensure([],function(require){
				cb(null,require('./chat/chatCtrl'));
			})
		}
	},
	{
		path:'friend',
		getComponent(nextState,cb){
			require.ensure([],function(require){
				cb(null,require('./friend/friendCtrl'));
			})
		}
	},
	{
		path:'cvs/:id',
		getComponent(nextState,cb){
			require.ensure([],function(require){
				cb(null,require('./canvas/cvs'));
			})
		}
	},
	{
		path:'/setting/:id',
		getComponent(nextState,cb){
			require.ensure([],function(require){
				cb(null,require('./setting/settingCtrl'));
			})
		}
	}
];

export {app}
