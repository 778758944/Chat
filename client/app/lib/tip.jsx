import "../assets/tip.scss";
var tipTimeout;
const Tip = {
    show : function(str,timeout){
        if(!str){
            return;
        }
        var $tipEl = $('#J_tip');
        if($tipEl.length == 0){
            $tipEl = $('<div id="J_tip" class="c-tip none">');
            $(document.body).append($tipEl);
        }
        window.clearTimeout(tipTimeout);
        $tipEl.html(str).css({'opacity' : 0}).removeClass('none');
        $tipEl.animate({opacity : 1},500,'ease-out');
        timeout = timeout || 2000;
        tipTimeout = setTimeout(function(){
            Tip.hide();
        },timeout);
    },
    hide : function(){
        var $tipEl = $('#J_tip');
        if($tipEl.length){
            $tipEl.animate({opacity : 0},500,'ease-out',function(){
                $tipEl.addClass('none');
            });
        }
    }
}
export default Tip;
