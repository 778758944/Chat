import kstorage from "./kstorage.js";
const kEnv = {
    env : function(){
        var ua = window.navigator.userAgent;
        var isAdj = ua.match(/aidaojia/) != null;
        var isWechat = ua.match(/MicroMessenger/) != null;  
        var isIos = ua.match(/(iPhone|iPod|iPad)/i) != null;
        var isAndroid = ua.match(/Android/i) != null;
        return {
            adj : isAdj,
            weChat : isWechat,
            ios : isIos,
            android : isAndroid
        }
    }(),
    //获取当前的path
    currentPath : function(){
        var pathname = location.pathname;
        pathname = pathname.split('/');
        pathname.pop();
        var path;
        if(pathname.length > 1){
            path = pathname.join('/');
        }
        else{
            path = '/';
        }
        return path;
    }(),
    //爱到家app内获取当前城市
    currentCity : function(){
        var result = null;
        //在app内，通过ua获取cityid
        //console.log(kEnv);
        if(kEnv.env.adj){
            var ua = window.navigator.userAgent;
            var cityid = ua.match(/\s+ctid\s+([\d\.]+)(;|\))/i);
            result = cityid != null ? cityid[1] : null;
        }
        if(!result){
            result = kstorage.get('acity') || 1;
        }
        return result;
    },
    getParams : function(){
    	var params = location.search.slice(1);
    	var result = {}
    	if(params){
    		var temp;
    		params = params.split('&');
    		params.forEach(function(item){
    			temp = item.split('=');
    			result[temp[0]] = temp[1];
    		});
    	}
    	return result;
    }(),
    compareVersion : function(v1,v2){ 
        v1 = v1.toString().split(".");
        v2 = v2.toString().split(".");
        
        for(var i = 0; i < v1.length || i < v2.length; i++) {
            var n1 = parseInt(v1[i],10),  n2 = parseInt(v2[i],10);
            
            if(window.isNaN(n1)) {
                n1 = 0;
            }
            if(window.isNaN(n2)) {
                n2 = 0;
            }
            if( n1 < n2 ) {
                return -1;
            }
            else if( n1 > n2) {
                return 1;
            }
        }
        return 0;
    },
    adjversion : function(version){
        //aidaojia/1.5 (iPhone; iOS 9.2.1; Scale/2.00)
        //aidaojia/1.5.1; smartisan msm8974sfo_lte; android 19;  channel default) Mozilla/5.0 (Linux; Android 4.4.2; SM705 Build/SANFRANCISCO) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36
        var adjReg = /aidaojia\/([\d\.]+)[\s\S]+/;
        var ua = window.navigator.userAgent;
        var result = ua.match(adjReg);
        //console.log(result);
        if(result != null){
            var curVersion = result[1];
            if(kEnv.compareVersion(curVersion,version) >= 0){
                return false;
            }
            else{
                return true;
            }
        }
        else{
            return false;
        }
    },
    getToken:function(){
        var ua=window.navigator.userAgent;
        var tokenObj=ua.match(/token\s(.{32})/);
        if(tokenObj){
            var token=tokenObj[1];
            if(token){
                return token;
            }
            else{
                location.href='aidaojia://login';
            }
        }
        else{
            location.href='aidaojia://login';
        }
    },
    getUser:function(){
        var ua=window.navigator.userAgent;
        var userId=ua.match(/userid\s(\d+)/)[1];
        if(userId){
            return userId;
        }
        else{
            location.href='aidaojia://login';
        }
    },
    isAuthorize : function(){
        if(kEnv.env.adj){
            return false;
        }
        var openid = kstorage.get(kstorage.onlystr);
        var params = kEnv.getParams;
        var code = params.code;
        if(!openid && !params.code){
            var url = location.href.split('#')[0];
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf00124665f5e8db5&redirect_uri='+ encodeURIComponent(url) +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
            return false;
        }
        return {
            code : code,
            openid : openid
        }
    },
    sendHost : function(){
        var hostname = location.hostname;
        //暂时固定写死
        var url = 'pay.aidaojia.com';
        if(hostname == 'aidaojia.com' || hostname == 'www.aidaojia.com'){
            url = 'pay.aidaojia.com';
        }
        else if(hostname == 'test.aidaojia.com'){
            url = 'test.pay.aidaojia.com';
        }
        else if(hostname == 'localhost' || hostname == '127.0.0.1'){
            url = 'test.pay.aidaojia.com';
        }
        return '//' + url;
    }(),
    sendpoint : function(param){
        param = param || {};
        var host = kEnv.sendHost;
        var url = host + "/monitor/kpi";
        var urlParam = {};
        if(kEnv.env.adj){
            urlParam['from'] = "adj";
        }
        else if(kEnv.env.weChat){
            urlParam['from'] = 'wechat';
        }
        var openid = kstorage.get(kstorage.onlystr);
        if(openid){
            urlParam['openid'] = openid;
        }
        for(var p in param){
            urlParam[p] = param[p];
        }
        var result = [];
        for(var p in urlParam){
            result.push(p + '=' + urlParam[p]);
        }
        var img = new Image();
        img.src = [url,'?',result.join('&')].join('');
    }
}

export default kEnv;