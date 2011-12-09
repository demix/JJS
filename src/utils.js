(function(global){

    var _setTimeout , _setInterval;

    global.onconstruct(function(){
        if( !_setTimeout && !_setInterval ){
            _setTimeout = window.setTimeout;
            _setInterval = window.setInterval;
            global._setTimeout = _setTimeout;
            global._setInterval = _setInterval;
        }
        window.setTimeout = function(callback , time){
            return _setTimeout(function(){
                jjs(callback);
            } , time);
        };
        window.setInterval = function(callback , time){
            return _setInterval(function(){
                jjs(callback);
            } , time);
        };
    });


    global.ondestruct(function(){
        window.setTimeout = _setTimeout;
        window.setInterval = _setInterval;
        _setTimeout = null;
        _setInterval = null;
    });

})(jjs);