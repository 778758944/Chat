;(function(window) {
    //判断线上 测试URL
    function get(url, data, callback) {
        if (typeof data === "function") {
            callback = data;
        }

        if (typeof data === "object") {
            url = data ? url + '?' + urlCode(data) : url;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.onload = function () {
            var json = JSON.parse(xhr.responseText)
            callback(json);
        }
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send();
    }

    function post(url, data, callback) {
        if (typeof data === "function") {
            callback = data;
            data = null;
        }

        var xhr = new XMLHttpRequest();

        xhr.open('post', url);
        xhr.onload = function () {
            if(xhr.status == 200){

                var json = JSON.parse(xhr.responseText)
                if(json.code == -4) location.href = location.href

                callback(json);


            }else{

            }

        };


        xhr.setRequestHeader('content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send(urlCode(data));


    }

    function urlCode(data) {
        var str = '';
        if (!data) {
            return null;
        }
        for (var key in data) {
            str += key + '=' + encodeURIComponent("".trim.call(data[key])) + '&';
        }

        return str.substring(0, str.length - 1);
    }

    function ccajax(option) {
        var defaults = {
            type: "post",
            url: '/',
            callback: function () {
            },
            data: {}
        }
        for (var name in option) {
            defaults[name] = option[name]
        }
        var xhr = new XMLHttpRequest();
        xhr.open(defaults.type, defaults.url);
        xhr.onload = function () {
            var json = JSON.parse(xhr.responseText)
            defaults.callback(json);
        };
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader('content-Type', 'application/x-www-form-urlencoded');
        xhr.send(urlCode(defaults.data));
    }


    window.cget = get
    window.cpost = post
    window.ajax = ccajax
    window.cl = function (x) {
        console.log(x)
    }

    var params = function () {
        var params = location.search.slice(1);
        params = params.split('&');
        var result = {};
        var val;
        for (var i = 0, len = params.length; i < len; i++) {
            val = params[i].split('=');
            result[val[0]] = val[1] || '';
        }
        return result;
    }();
    window.params = params

})(window)