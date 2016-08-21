const kTime = {
    //获取时间，年月日时分秒
    getFullDate : function(time){
        var time = time ? parseInt(time,10) : null;
        if(!time){
            return;
        }
        var curdate = new Date(time);
        return {
            year : curdate.getFullYear(),
            month : curdate.getMonth(),
            date : curdate.getDate(),
            hour : curdate.getHours(),
            minute : curdate.getMinutes(),
            second : curdate.getSeconds()
        }
    },
    //第一个参数data的年月日,第二个参数的时分秒,融合后返回秒
    getMiniTime : function(date,time){
        date = date ? parseInt(date,10)*1000 : Date.now();
        var zdate = kTime.getFullDate(date);
        var tdate;
        if(typeof time == 'object'){
            tdate = time;
        }
        else{
            time = time ? parseInt(time,10)*1000 : Date.now();
            tdate = kTime.getFullDate(time);
        }
        var year = zdate.year;
        var month = zdate.month;
        var ddate = zdate.date;
        var hour = tdate.hour;
        var minute = tdate.minute || 0;
        var second = tdate.second || 0;
        var newdate = new Date(year,month,ddate,hour,minute,second).getTime();
        return Math.floor(newdate/1000);
    },
    fetchDiffName : function(startDate,curDate){
        startDate = startDate ? parseInt(startDate,10) : Date.now();
        startDate = new Date(startDate);
        var syear = startDate.getFullYear();
        var smonth = startDate.getMonth();
        var sday = startDate.getDate();
        var newstartDate = new Date(syear,smonth,sday,0,0,0).getTime();

        curDate = curDate ? parseInt(curDate,10) : Date.now();
        curDate = new Date(curDate);
        var cyear = curDate.getFullYear();
        var cmonth = curDate.getMonth();
        var cday = curDate.getDate();
        var newcurDate = new Date(cyear,cmonth,cday,0,0,0).getTime();

        var str = '';
        var oneday = 24*60*60*1000;
        var diff = newstartDate - newcurDate;
        //console.log(diff,newstartDate,newcurDate);
        switch(diff){
            case 0:
                str = '今天';
                break;
            case oneday*1:
                str = '明天';
                break;
            default:
                str = '';
                break;
        }
        return str;
    },
    /*
        获取对应的类似格式
        type [String]
            "month"  如5月4日
            "hour"   如12:20
            "months" 如05-12
            ""       如2015-02-23 06:45
    */
    getFormatDate : function(time,type){
        var curdate = kTime.getFullDate(time);
        var result = '';
        if(time){
            var year = curdate.year;
            var month = curdate.month + 1;
            var date = curdate.date;
            var hour = curdate.hour;
            var minute = curdate.minute;
            month = month > 9 ? month : '0' + month;
            date = date > 9 ? date : '0' + date;
            hour = hour > 9 ? hour : '0' + hour;
            minute = minute > 9 ? minute : '0' + minute;

            if(type == 'month'){
                result = [month,'月',date,'日'].join('');
            }
            else if(type == 'hour'){
                result = [hour,minute].join(':');
            }
            else if(type == 'months'){
                result = [month,'-',date].join('');
            }
            else{
                result = [year,month,date].join('-') + ' ' + [hour,minute].join(':');
            }
        }
        return result;
    },
    getTimeSlot : function(start,end,split){
        split = split || '~';
        start = start ? parseInt(start,10) * 1000 : null;
        end = end ? parseInt(end,10) * 1000 : null;
        var startTime = kTime.getFormatDate(start,'hour');
        var endTime = kTime.getFormatDate(end,'hour');
        return [startTime,endTime].join(split);
    },
    //比较时间
    compareTime : function(other,cur){
        other = other ? parseInt(other,10) * 1000 : null;
        cur = cur ? parseInt(cur,10) : null;
        if(other > cur){
            return 1;
        }
        else if(other < cur){
            return -1;
        }
        else{
            return 0;
        }
    },
    //当前时间是毫秒数，其他时间都是秒
    compareHour : function(other,cur){
        other = other ? parseInt(other,10) * 1000 : null;
        cur = cur ? parseInt(cur,10) : null;
        var otherDate = kTime.getFullDate(other);
        var curDate = kTime.getFullDate(cur);
        var newotherDate = new Date(curDate.year,curDate.month,curDate.date,otherDate.hour,otherDate.minute,otherDate.second).getTime();
        //console.log(other,otherDate,curDate);
        if(newotherDate > cur){
            return 1;
        }
        else if(newotherDate < cur){
            return -1;
        }
        else{
            return 0;
        }
    },
    reviseTime : function(other,cur){
        other = other ? parseInt(other,10) * 1000 : null;
        cur = cur ? parseInt(cur,10) : null;
        var otherDate = kTime.getFullDate(other);
        var curDate = kTime.getFullDate(cur);
        var newotherDate = new Date(curDate.year,curDate.month,curDate.date,otherDate.hour,otherDate.minute,otherDate.second).getTime();
        return newotherDate;
    }
}
export default kTime;