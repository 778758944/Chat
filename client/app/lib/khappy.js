import ktime from "./ktime.js";
import kenv from "./kenv.js";
//获取当前分享的状态
export function HappyMethodStatus(data,curtime){
    var teamInfo = data.teamInfo;
    var begin_time = teamInfo.begin_time;
    var expire_time = teamInfo.expire_time;
    //1.即将开始,2.已结束,3.已售完,4.开始拉票,5.即将免单,6.立即购买,7.立即付款,8.下单成功，9.失败
    var status = 0;
    var surplus = teamInfo.max_number - teamInfo.now_number;
    var state = data.state;
    //区分当前是否本人,是本人且下过单，优先级高于商品的限制
    var isOwn = data.is_own;
    if(isOwn && isOwn == 1){
        if(state == 3){
            status = 7;
        }
        else if(state == 4){
            status = 8;
        }
        else if(state == 5){
            status = 9;
        }
        else if(state == 6){
            status = 10;
        }
        if(status != 0){
            return status;
        }
    }
    if(ktime.compareTime(begin_time,curtime) > 0){
        status = 1;
    }
    else if(ktime.compareTime(expire_time,curtime) <= 0){
        status = 2;
    }
    else{
        if(surplus <= 0){
            status = 3;
        }
        else{
            switch(state){
                case 0:
                    status = 4;
                    break;
                case 1:
                    status = 5;
                    break;
                case 2:
                    status = 6;
                    break;
                case 3:
                    status = 7;
                    break;
                case 4:
                    status = 8;
                    break;
                case 5:
                    status = 9;
                    break;
                case 6:
                    status = 10;
                    break;
                default:
                    status = 4;
            }
        }
    }
    return status;
};
//获取分享状态文案
export function HappyMethodShare(data){
    var teamInfo = data.teamInfo;
    var teamPrice = data.team_price;  //总价
    var pricePerLike = data.price_per_like;  //每票值几元
    var likeCount = data.like_count;  //已投票人数
    var diffCount = Math.ceil(teamPrice/pricePerLike) - likeCount;
    diffCount = diffCount > 0 ? diffCount : 0;
    return {
        title : "【还差"+ diffCount +"票】爱到家正在欢乐送！投我1票，立减"+ pricePerLike +"元！",
        desc : "免单拿下*"+ teamInfo.title +"*就靠你了！拉上你的小伙伴也来给你免一单～",
        link : "http://www.aidaojia.com"+ kenv.currentPath +"/happy_detail.html",
        imgUrl : teamInfo.image0
    }
};