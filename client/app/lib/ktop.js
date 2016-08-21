import base64 from "./base64.js";
import sha1 from "./sha1.js";
import kenv from "./kenv.js";
import kstorage from "./kstorage.js";
if(typeof Object.assign != 'function'){
    (function(){
        Object.assign = function(target){
            if(target === undefined || target === null){
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var output = Object(target);
            for(var index = 1; index < arguments.length; index++){
                var source = arguments[index];
                if(source !== undefined && source !== null){
                    for (var nextKey in source){
                        if (source.hasOwnProperty(nextKey)){
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}

const ktopUtils = {
    hostname : function(){
        var hostname = location.hostname;
        var pathname = location.pathname;
        pathname = pathname.split('/');
        //去除头尾
        pathname.shift();
        pathname.pop();
        //暂时固定写死
        var url = 'gateway.aidaojia.com';
        if(hostname == 'aidaojia.com' || hostname == 'www.aidaojia.com'){
            if(pathname.indexOf('group') != -1){
                url = 'gateway.aidaojia.com';
            }
            else if(pathname.indexOf('grouptest') != -1){
                url = 'test.gateway.aidaojia.com';
            }
            else if(pathname.indexOf('groupoffline') != -1){
                url = 'test.gateway.aidaojia.com';
            }
            else if(pathname.indexOf('groupmulti') !=-1){
                url='gateway.aidaojia.com';
            }
            else{
                url = 'gateway.aidaojia.com';
            }
        }
        else if(hostname == 'test.aidaojia.com'){
            url = 'test.gateway.aidaojia.com';
        }
        else if(hostname == 'localhost' || hostname == '127.0.0.1'){
            url = 'test.gateway.aidaojia.com';
        }
        return url;
    }(),
    appSec : '77bb4062f36f405194d1c4ef3508ff73',
    defaultDefault : {
        ttid : 'aidaojia',
        appKey : 'e2c2ab71e885408ea213a4f426e9529d',
        appVersion : '1.0.0',
        osType : 3,
        osVersion : '1.0.0',
        hwId : 'wx-h5',
        mobileType : 'wx-h5'
    },
    merge  : function(params){
        params = params || {};
        var str = '';
        str += ktopUtils.appSec;
        var keys = Object.keys(params);
        keys.sort().reverse();
        for(var k=0,len=keys.length;k<len;k++){
            //配合JSON.stringify会过滤unfefined的数据
            if(typeof params[keys[k]] !== 'undefined'){
                str += keys[k];
                str += params[keys[k]];
            }
        }
        str += ktopUtils.appSec;
        return str;
    },
    h5SignAlgorithm : function(merged){
        //console.log(merged);
        var tmp = base64.btoa(merged,true);
        return sha1(tmp);
    },
    getRequestUrl : function(params){
        var url = '//'+ ktopUtils.hostname +'/gateway';
        url += '?';
        var value;
        var result = [];
        for(var k in params){
            k = encodeURIComponent(k);
            value = params[k];
            if(value){
                value = encodeURIComponent(value);
            }else{
                value = '';
            }
            result.push(k + '=' + value);
        }
        url += result.join('&');
        return url;
    }
}

var jsonpID = 0;
var ajaxJSONP = function(options){
    let url = options.url;
    if(!url){
        new TypeError("url is not exist");
    }
    let data = options.data || {};
    let params = ['v=' + Date.now()];
    for(var p in data){
        params.push(p +'='+ data[p]);
    };
    params = params.join('&');
    url += url.indexOf('?') == -1 ? '?' : '&';
    url += params;
    let success = options.success;
    let error = options.error;
    function ajaxSuccess(result){
        success && success(result);
    }
    function ajaxError(result){
        error && error(result);
    }
    let _callbackName = options.jsonpCallback;
    let callbackName = _callbackName || ('jsonp' + (++jsonpID));
    let script = document.createElement('script');
    let originalCallback = window[callbackName];
    let responseData;
    let xhr = { abort: abort };
    let abortTimeout;
    let handle = function(e, errorType){
        clearTimeout(abortTimeout);
        script.removeEventListener('load',handle,false);
        script.removeEventListener('error',handle,false);
        let type = typeof e == 'string' ? e : e.type;
        if(type == 'error' || !responseData){
            ajaxError(errorType || 'error');
        }
        else{
            ajaxSuccess(responseData[0]);
        }
        window[callbackName] = originalCallback;
        if(responseData && typeof originalCallback == 'function'){
            originalCallback(responseData[0]);
        }
        originalCallback = responseData = undefined;
    }
    let abort = function(errorType) {
        handle('error', errorType || 'abort');
    };
    script.addEventListener('load',handle,false);
    script.addEventListener('error',handle,false);

    window[callbackName] = function(){
        responseData = arguments
    }
    script.src = url + '&callback=' + callbackName;
    document.head.appendChild(script)

    if(options.timeout > 0){
        abortTimeout = setTimeout(function(){
            abort('timeout');
        },options.timeout)
    }
}
var ajax = function(options){
    options = options || {};
    if(options.dataType && options.dataType == 'jsonp'){
        ajaxJSONP(options);
        return;
    }
    let success = options.success;
    let error = options.error;
    function ajaxSuccess(result){
        success && success(result);
    }
    function ajaxError(result){
        error && error(result);
    }
    let headers = {};
    function setHeader(name, value){
        headers[name.toLowerCase()] = [name, value];
    }
    let xhr = new window.XMLHttpRequest();
    let nativeSetHeader = xhr.setRequestHeader;
    let blankRE = /^\s*$/;
    let abortTimeout;

    setHeader('Accept','application/json');
    if(options.contentType){
        setHeader('Content-Type', options.contentType)
    }

    if (options.headers) for (name in options.headers) setHeader(name, options.headers[name]);
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            xhr.onreadystatechange = null;
            clearTimeout(abortTimeout);
            var result, error = false
            if((xhr.status >= 200 && xhr.status < 300)){
                result = xhr.responseText;
                try{
                    result = blankRE.test(result) ? null : JSON.parse(result);
                }
                catch(e){
                    error = e;
                }
                if(error){
                    ajaxError(error);
                }
                else{
                    ajaxSuccess(result)
                }
            }
            else {
                ajaxError(xhr.status ? 'error' : 'abort')
            }
        }
    }
    xhr.open(options.type, options.url, true);
    if(options.xhrFields){
        for(name in options.xhrFields){
            xhr[name] = options.xhrFields[name];
        }
    }
    for(name in headers){
        nativeSetHeader.apply(xhr, headers[name]);
    }
    if (options.timeout > 0){
        abortTimeout = setTimeout(function(){
            xhr.onreadystatechange = null;
            xhr.abort()
            ajaxError('timeout');
        }, options.timeout)
    }
    xhr.send(options.data ? options.data : null)
    return xhr
}

var callbackCount = 1;
const ktop = {
    ajaxJSONP : ajaxJSONP,
    ajax : ajax,
    /*
        option {Object}
            - api 接口名称
            - apiVersion 接口版本号
            - data 参数
    */
    request : function(option){
        option = option || {};
        var api = option.api;
        var apiVersion = option.apiVersion || '*';
        var data = option.data || {};
        var success = option.success;
        var fail = option.fail;
        var error = option.error;
        //var showMsg = option.showMsg;

        if(!api){
            return;
        }
        if(data.userRole){
            var params =  Object.assign({},ktopUtils.defaultDefault,{
                api : api,
                apiVersion : apiVersion,
                timestamp : new Date().getTime(),
                userRole:data.userRole,
                userId:data.userid,
                token:data.token,
                ctid:data.cityId,
                cmmid:data.cmmid
            });

            delete data.userRole;
            delete data.userid;
            delete data.token;
            delete data.cityId;
            delete data.cmmid;
        }
        else{
            var params =  Object.assign({},ktopUtils.defaultDefault,{
                api : api,
                apiVersion : apiVersion,
                timestamp : new Date().getTime()
            });
        }
        var mergeParam =  Object.assign({},params,data);
        //console.log(data,mergeParam,params);
        var sign = ktopUtils.h5SignAlgorithm(ktopUtils.merge(mergeParam));
        params.sign = sign;
        var url = ktopUtils.getRequestUrl(params);
        //console.log(sign);
        var dataJson = encodeURIComponent(JSON.stringify(data));
        ajax({
            url : url,
            contentType : 'text/plain',
            type : 'post',
            data : dataJson,
            xhrFields : {
                withCredentials: true
            },
            success : function(result){
                result = result || {};
                var code = result.code;
                var msg = result.msg;
                var data = result.data || {};
                if(code == 200){
                    success && success(data);
                }
                else{
                    result.msg = msg || '请求出错，请返回重试';
                    fail && fail(result);
                }
            },
            error : function(){
                error && error({
                    msg : '网络请求失败，请稍后重试'
                });
            }
        });
    },
    /*
        自动判断登录的请求
    */
    loginRequest : function(option){
        option = option || {};
        var api = option.api;
        var apiVersion = option.apiVersion || '*';
        var data = option.data || {};
        var success = option.success;
        var fail = option.fail;
        var error = option.error;
        //var showMsg = option.showMsg;

        if(!api){
            return;
        }
        var params = Object.assign({},ktopUtils.defaultDefault,{
            api : api,
            apiVersion : apiVersion,
            timestamp : new Date().getTime()
        });
        var mergeParam = Object.assign({},params,data);
        var sign = ktopUtils.h5SignAlgorithm(ktopUtils.merge(mergeParam));
        params.sign = sign;
        var url = ktopUtils.getRequestUrl(params);
        var dataJson = encodeURIComponent(JSON.stringify(data));
        ajax({
            url : url,
            contentType : 'text/plain',
            type : 'post',
            data : dataJson,
            xhrFields : {
                withCredentials: true
            },
            success : function(result){
                result = result || {};
                var code = result.code;
                //var msg = result.msg;
                var data = result.data || {};
                if(code == 200){
                    success && success(data);
                }
                else if(code == 202 || code == 203 || code == 204){
                    if(kenv.env.adj){
                        location.href = 'aidaojia://login';
                    }
                    else{
                        kstorage.remove(kstorage.onlystr);
                        kenv.isAuthorize();
                    }
                }
                else{
                    fail && fail(result);
                }
            },
            error : function(){
                error && error();
            }
        });
    },
    callNative : function(option){
        option = option || {};
        var url = option.url;
        if(!url){
            return;
        }
        var params = option.params || {};
        var data = [];
        for(var p in params){
            data.push(p + '=' + params[p]);
        }
        //console.log(callbackCount);
        var callbackName = 'nativeCallback' + callbackCount;
        callbackCount ++;
        data.push('callback=' + callbackName);
        data = data.join('&');
        var succ = option.succ;
        //var fail = option.fail;
        window[callbackName] = function(){
            succ && succ.apply(window,arguments);
            delete window[callbackName];
        }
        //console.log('aidaojia://' + url + '?' + data);
        location.href = 'aidaojia://' + url + '?' + data;
    }
}
export default ktop;