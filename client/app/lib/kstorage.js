const localStorage = function(){
    let testdata = 'storagestoragestoragestoragestorage';
    var storage = window.localStorage;
    try{
        storage.setItem('testdata',testdata);
        storage.removeItem('testdata');
        return storage;
    }
    catch(e){
        return null;
    }
}();

const kStorage = {
    onlystr : "adjlltid",  //全局存储内容
    set : function(key,value){
        if(localStorage){
            return localStorage.setItem(key,value);
        }
    },
    get : function(key){
        if(localStorage){
            return localStorage.getItem(key) || '';
        }
    },
    remove : function(key){
        if(localStorage){
            return localStorage.removeItem(key);
        }
    }
}

export default kStorage;