/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-20 15:20:55
 * @version $Id$
 */
var path=require('path');
var HtmlwebpackPlugin=require("html-webpack-plugin");

var ROOT_PATH=path.resolve(__dirname);
var APP_PATH=path.resolve(ROOT_PATH,'client/app');
var BUILD_PATH=path.resolve(ROOT_PATH,'client/build');


module.exports={
	entry:path.resolve(APP_PATH,'index.jsx'),
	output:{
		path:BUILD_PATH,
		filename:'bundle.js'
	},
	plugins:[
		new HtmlwebpackPlugin({
			title:"Chat",
			template:'./client/app/index-tem.html'
		})
	],
	devtool:"eval-source-map",
	devServer:{
		historyApiFallback:true,
		hot:true,
		inline:true,
		progress:true,
		proxy:{
			'/api/yonghus/login':{
				target:"http://0.0.0.0:3002",
				secure:false
			}
		}
	},
	module:{
		loaders:[
			{
				test:/\.(jpg||png)$/,
				loader:'url?limit=400&name=imgs/[name]-[hash].[ext]'
			},
			{
				test:/\.css$/,
				loader:"style-loader!css-loader!postcss-loader",
				include:APP_PATH
			},
			{
				test:/\.js[x]?$/,
				loader:'babel',
				include:APP_PATH,
				query:{
					presets:['es2015','react']
				}
			}
		]
	},
	postcss:function(){
		return [require('autoprefixer'),require('precss')];
	}
};





















