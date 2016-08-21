import sha1 from "./sha1.js";
import ktop from "./ktop.js";
import kenv from "./kenv.js";
import wx from "weixin-js-sdk";

var kwechat = {
    randomStr : function(){
        return Math.random().toString(36).substr(2);
    },
    initWeChat : function(jsApiList,callback){
        var env = kenv.env;
        if(!env.weChat){
            return;
        }
        function firstInit(ticket,callback){
            var ticket = ticket;
            var timestamp = Date.now();
            var nonceStr = kwechat.randomStr();
            var url = location.href.split('#')[0];
            var sign = 'jsapi_ticket='+ ticket +'&noncestr='+ nonceStr +'&timestamp='+ timestamp +'&url=' + url;
            sign = sha1(sign);
            wx.config({
                debug : false,
                appId : 'wxf00124665f5e8db5',
                timestamp : timestamp,
                nonceStr : nonceStr,
                signature : sign,
                jsApiList : jsApiList
            });
            wx.ready(function(){
                callback && callback.call(wx);
            });
        }
        ktop.request({
            api : 'adj.w.getTicket',
            apiVersion : "1.0.0",
            success : function(data){
                firstInit(data,callback);
            },
            fail : function(result){
                //reject(result);
            },
            error : function(result){
                //reject(result);
            }
        });
    }
}
export default kwechat;