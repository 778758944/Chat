var Messager = {
    _events: {},
    trigger: function (event, data) {
        if (!this._events[event]) return;
        for (var i = 0; i < this._events[event].length; i++)
            this._events[event][i](data);
    },
    on: function (event, callback) {
      if (!this._events[event]) this._events[event] = [];
      this._events[event].push(callback);
    },
    off: function(event){
        if(this._events && this._events[event]) {
            delete this._events[event];
        }
    }
}
export default Messager;