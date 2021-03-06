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
var webpack=require('webpack');



module.exports={
	entry:{
		index:path.resolve(APP_PATH,'index.jsx'),
		run:path.resolve(APP_PATH,'run.jsx'),
		autumn:path.resolve(APP_PATH,'autumn.jsx'),
		autumnWechat:path.resolve(APP_PATH,'autumnWechat.jsx'),
		newslist:path.resolve(APP_PATH,'newslist.jsx'),
		newsdetail:path.resolve(APP_PATH,'newsdetail.jsx')
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
			title:"百米飞人大战",
			filename:'run.html',
			inject:"head",
			chunks:['vendors','run'],
			template:'./client/app/index-tem.html'
		}),
		new HtmlwebpackPlugin({
			title:"autumn",
			filename:"autumn.html",
			chunks:['vendors','autumn'],
			template:'./client/app/index-tmp2.html'
		}),
		new HtmlwebpackPlugin({
			title:"【中秋嘉年华】玩分享点赞，赢加倍红包",
			filename:"autumnWechat.html",
			chunks:['vendors','autumnWechat'],
			template:'./client/app/index-tmp2.html'
		}),
		new HtmlwebpackPlugin({
			title:"new list",
			filename:"newslist.html",
			chunks:['vendors','newslist'],
			template:'./client/app/index-tem3.html'
		}),
		new HtmlwebpackPlugin({
			title:'newsdetail',
			filename:'newsdetail.html',
			chunks:['vendors','newsdetail'],
			template:"./client/app/index-tem3.html"
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name:"vendors",
			chunks:['index','run','autumn','autumnWechat','newslist','newsdetail'],
			minChunks:2
		})
	],
	devtool:"eval-source-map",
	devServer:{
		historyApiFallback:true,
		hot:true,
		inline:true,
		progress:true,
		proxy:{
			'/api/*':{
				target:"http://0.0.0.0:3002",
				secure:true
			},
			'/userImg/*':{
				target:'http://0.0.0.0:3002',
				secure:true
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
		return [require('autoprefixer')({
			browsers:['IOS >= 6.0','Android >= 4.0']
		}),require('precss')];
	}
};





















