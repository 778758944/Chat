(function (window) {


    var tm = '<div class="message" v-bind:class="{\'message-move\': show}">' +
        '<div class="message-content">' +
        '<i v-bind:class="{\'icon-checkcircle\': type == 1, \'icon-crosscircle\': type == 2 }" class="iconfont"></i> ' +
        '<span>{{ text }}</span>' +
        '</div>' +
        '</div>';


    var element = document.createElement('div');
    element.id = 'msg'
    element.innerHTML = tm
    document.body.appendChild(element)


    var $message = new Vue({
        el: '#msg',
        data:{
            show: false,
            type: 1,
            text: '',
            flag: ''
        },
        methods:{
            success: function(text){
                this.show = true
                this.text = text
                this.type = 1
                clearTimeout(this.flag)
                this.flag = setTimeout(function () {
                    this.show = false
                }.bind(this), 2000)
            },
            error: function(text){
                this.show = true
                this.text = text
                this.type = 2
                clearTimeout(this.flag)
                this.flag = setTimeout(function () {
                    this.show = false
                }.bind(this), 2000)
            }
        }
    })


    


    window.$message = $message



})(window)
