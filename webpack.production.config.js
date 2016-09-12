/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-20 15:20:55
 * @version $Id$
 */
var path=require('path');
var webpack=require('webpack');
var HtmlwebpackPlugin=require("html-webpack-plugin");
var ROOT_PATH=path.resolve(__dirname);
var APP_PATH=path.resolve(ROOT_PATH,'client/app');
var BUILD_PATH=path.resolve(ROOT_PATH,'client/build');



module.exports={
	entry:{
		index:path.resolve(APP_PATH,'index.jsx'),
		autumnWechat:path.resolve(APP_PATH,'autumnWechat.jsx')
	},
	output:{
		path:BUILD_PATH,
		filename:'[name].js'
	},
	plugins:[
		new HtmlwebpackPlugin({
			title:"Chat",
			filename:'index.html',
			inject:'head',
			chunks:['vendors','index'],
			template:'./client/app/index-tem.html'
		}),
		new HtmlwebpackPlugin({
			title:"【中秋嘉年华】玩分享点赞，赢加倍红包",
			filename:"autumnWechat.html",
			chunks:['vendors','autumnWechat'],
			template:'./client/app/index-tmp2.html'
		}),
		new webpack.optimize.UglifyJsPlugin({
           compress: {
               warnings: false
           }
        })
	],
	module:{
		loaders:[
			{
				test:/\.(jpg||png)$/,
				loader:'url?limit=400&name=imgs/[name]-[hash].[ext]'
			},
			{
				test:/component\.scss$/,
				loader:'style-loader!css-loader?modules!postcss-loader',
				include:APP_PATH
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





















